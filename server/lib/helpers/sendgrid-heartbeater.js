'use strict';

/**
 * Dependencies
 */
const
  SendgridClient = require('../classes/sendgrid-client')

/**
 * Helper to check heartbeats of sendmail server
 */

module.exports = async function sendgridHeartbeater() {

  const data = {
    "personalizations": [
      {
        "to": [
          {
            "email": "test@sink.sendgrid.net"
          }
        ],
        "subject": "1"
      }
    ],
    "from": {
      "email": "test@sink.sendgrid.net",
      "name": "Peter Tan"
    },
    "subject": "1",
    "content": [
      {
        "type": "text/plain",
        "value": "1"
      }
    ],
    "mail_settings":{"sandbox_mode":{"enable":true}}
  };

  const sendgridClient = new SendgridClient('post', 'mail/send');
  const response = await sendgridClient.send(data);

  console.log('sendgridClient.send return: ' + response.status);

  if(response.status == '200') {
    return true;
  }
  return false;

};
