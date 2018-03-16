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




//  const data = {"personalizations":[{"to":[{"email":"lldylldx@gmail.com"}],"subject":"Hello, World! By Sendgrid!"}],"from":{"email":"test@example.com"},"reply_to":{"email":"test@example.com"},"subject":"1","content":[{"type":"text/plain","value":"1"}],"mail_settings":{"sandbox_mode":{"enable":true}}};

  const sendgridClient = new SendgridClient('post', 'mail/send', data);
  const response = await sendgridClient.send(data);
  // call mailgun message body builder.
  console.log('sendgridClient.send return: ' + response.status);

  if(response.status == '200') {
    return true;
  }
  return false;

};
