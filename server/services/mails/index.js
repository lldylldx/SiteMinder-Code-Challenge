'use strict';

/**
 * Dependencies
 */
const
  mailServersManager = require('../../lib/classes/mail-servers-manager'),
  mailServicesManager = require('../../lib/classes/mail-services-manager');

// This service is used to send plaint text email.

async function sendMails(req, res) {

  console.log(req.body);
  const serverName = mailServersManager.getPrimServer();
  //Check which APIs should be used, MailGun or SendGrid
  if(serverName == 'null') {
    const message = {
      errors: [{
        message: 'No mail server in service.'
      }]
    }
    return res.json(message);
  }

  // Create mail client based on primary server
  mailServicesManager.setServerName(serverName);
  if(serverName == 'sendgrid') {
    mailServicesManager.setClient('post', 'mail/send');
  }
  else if (serverName == 'mailgun') {
    mailServicesManager.setClient('post', '/messages');
  }
  // send email
  const response = await mailServicesManager.sendMail(req.body);
  console.log('response.status: ' + response.status);
  // check response from mail client
  if(response.status == '200' || response.status == '202') { //use regex
    const timestamp = Date.now() / 1000 | 0;
    const message = {
      timestamp: timestamp,
      message: 'Queued. Thank you.'
    };
    return res.json(message);
  }
  else if (response.status == '500') {
    const message = {
      errors: [{
        message: 'Server Issues. Cant send the email, please try it again.'
      }]
    };
    return res.json(message);
  }

  const message = {
    errors: [{
      message: 'Unknow Issues.'
    }]
  };
  return res.json(message);

}

module.exports = {
    sendMails: sendMails
};
