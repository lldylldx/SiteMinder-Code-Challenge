'use strict';

/**
 * Dependencies
 */
const mailServersManager = require('../classes/mail-servers-manager'),
      MailServicesManager = require('../classes/mail-services-manager');

const
  mailServicesManager = new MailServicesManager(),
  AWS = require('aws-sdk'),
  sqsRegion = 'ap-southeast-2',
  queueUrl = 'https://sqs.ap-southeast-2.amazonaws.com/791124190238/southface_com_au';

let receiptHandle = '';

  AWS.config.update(
   {
     accessKeyId: process.env.ACCESS_KEY_ID,
     secretAccessKey: process.env.SECRET_ACCESS_KEY,
     region: sqsRegion
   }
  );

const sqs = new AWS.SQS();

const receiveOptions = {
  QueueUrl: queueUrl,
  MaxNumberOfMessages: 1, // how many messages do we wanna retrieve?
  WaitTimeSeconds: 10, // wait for a message by maximum 10 seconds
  VisibilityTimeout: 20 //  20s wait time for anyone else to process.
};

const sendOptions = {
  QueueUrl: queueUrl,
  DelaySeconds: 0, // how many messages do we wanna retrieve?
  MessageBody: ''
};

function sendMessage(params, callback) {
  sqs.sendMessage(params, (err, data) => {
        if(err) {
            console.log(err, err.stack);
        }
        else {
            console.log(data);

        }
        if(typeof callback === 'function') {
          callback(err, data);
        }
  });
}

function receiveMessage(callback) {
  //let response;
  sqs.receiveMessage(receiveOptions, async function(err, data) {

    if(err) {
      console.log(err);
    }
    else {

      // If there are any messages to get
      if (data.Messages) {
        // Get the first message (should be the only one to make it simple)
        const message = data.Messages[0];
        try {
          const body = JSON.parse(message.Body);
        } catch(err) {
          console.log(err);
          return Promise.reject(new Error(400));

        }



        receiptHandle = message.ReceiptHandle;
        console.log('receiptHandle:' + receiptHandle);

        // Now this is where you'd do something with this message
        const serverName = mailServersManager.getPrimServer();
        //Check which client should be used, MailGun or SendGrid
        if(serverName === 'null') {
          //if no primary server is set, then set mailgun as default
          serverName = 'mailgun';
        }

        // Create mail client based on primary server
        mailServicesManager.setServerName(serverName);
        if(serverName === 'sendgrid') {
          mailServicesManager.setClient('post', 'mail/send');
        }
        else if (serverName === 'mailgun') {
          mailServicesManager.setClient('post', '/messages');
        }
        // send email
        const response = await mailServicesManager.sendMail(body);
        console.log('response.status: ' + response.status);
        // check response from mail client
        if(/^2\d\d$/.test(response.status)) { //if success
          // if send email successfully, delete this message from the queue
          removeFromQueue(message);
        }

        if(typeof callback === 'function') {
          callback(err, data, response.status);
        }
     }
    }
  });
}


function removeFromQueue(message) {
   sqs.deleteMessage({
      QueueUrl: queueUrl,
      ReceiptHandle: message.ReceiptHandle
   }, function(err, data) {
      // If we errored, tell us that we did
      err && console.log(err);
   });
};

module.exports = {
    sendMessage: sendMessage,
    receiveMessage: receiveMessage,
    sendOptions: sendOptions
};
