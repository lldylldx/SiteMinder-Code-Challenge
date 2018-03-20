'use strict';

/**
 * Dependencies
 */
const
  mailServersManager = require('../../lib/classes/mail-servers-manager'),
  MailServicesManager = require('../../lib/classes/mail-services-manager'),
  buildJsonResponse = require('../../lib/helpers/build-json-resp');

const mailServicesManager = new MailServicesManager();

// This service is used to send plaint text email.

async function sendMails(req, res) {

  console.log(req.body);
  const serverName = mailServersManager.getPrimServer();
  //if no primary server is set, then set mailgun as the default.
  if(serverName === 'null') {
    mailServersManager.setPrimServer('mailgun');
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
  console.log(JSON.stringify(req.body));

  let response;

  try {
    response = await mailServicesManager.sendMail(req.body);
    console.log('response.status: ' + response.status);
  } catch (err) {
    console.log(err);
    mailServersManager.addPrimServDownTime();
    const resJson = {errors:[{"messge": "The server is currently unavailable "}]};
    return res.status(503).json(resJson);

  }

  // check response from mail client
  if(/^2\d\d$/.test(response.status)) { //if success
    const resJson = buildJsonResponse();
    console.log(JSON.stringify(resJson.message));

    return res.status(200).json(resJson.message);
  }

  mailServersManager.addPrimServDownTime();

  //failed then try another active server

  //try another active server.
  const anotherServerName = mailServersManager.isMailServiceOn();
  //if no active server
  if(anotherServerName === 'null') {
    const resJson = {errors:[{"messge": "The server is currently unavailable "}]};
    return res.status(503).json(resJson);

  }

  // Create mail client based on active server
  mailServicesManager.setServerName(anotherServerName);
  if(anotherServerName === 'sendgrid') {
    mailServicesManager.setClient('post', 'mail/send');
  }
  else if (anotherServerName === 'mailgun') {
    mailServicesManager.setClient('post', '/messages');
  }
  // send email

  try {
    response = await mailServicesManager.sendMail(req.body);
    console.log('response.status: ' + response.status);
  } catch (err) {
    console.log(err);
    mailServersManager.addPrimServDownTime();
    const resJson = {errors:[{"messge": "The server is currently unavailable "}]};
    return res.status(503).json(resJson);

  }

  // check response from mail client
  if(/^2\d\d$/.test(response.status)) { //if success
    const resJson = buildJsonResponse();
    console.log(JSON.stringify(resJson.message));

    return res.status(200).json(resJson.message);
  }
  else if (/^5\d\d$/.test(response.status)) { //if server error
    const message = {
      errors: [{
        message: 'Server Issues. Cant send the email, please try it again.'
      }]
    };
    //mailServersManager.addPrimServDownTime();

    return res.status(500).json(message);
  }

  //else it's client side issue.
  const message = {
    errors: [{
      message: 'Unknow Issues.'
    }]
  };
  return res.status(400).json(message);

}

module.exports = {
    sendMails: sendMails
};
