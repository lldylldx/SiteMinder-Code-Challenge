'use strict';

/**
 * Dependencies
 */
const sqsService = require('./sqs-client');

let count = 0;

setInterval(() => {

  console.log('In child process: ' + process.pid );
  console.log('Succeed sending '+ count +'th a message from SQS!');

  sqsService.receiveMessage((err, data, response) => {

    // if send email successfully, add count by 1 
    if(/^2\d\d$/.test(response)) {
      count = count + 1;
    }

  });

}, 10000);
