'use strict';

/**
 * Dependencies
 */
const MailgunClient = require('../classes/mailgun-client');

/**
 * Helper to check heartbeats of mailgun server
 */

module.exports = async function mailgunHeartbeater() {

  //send a testmode message to mailgun for heartbeats check
  const data = {
    from: 'test@test.com',
    to: 'test@test.com',
    subject: '1',
    text: '1',
    'o:testmode': 'True'
  };

  const mailgunClient = new MailgunClient('post', 'messages');
  const response = await mailgunClient.send(data);

  console.log('mailgunClient.send return: ' + response.status);

  if(response.status == '200') {
    return true;
  }
  return false;
};
