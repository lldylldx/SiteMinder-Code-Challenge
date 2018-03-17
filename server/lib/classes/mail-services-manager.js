'use strict';

/**
 * Dependencies
 */
const
  MailgunClient = require('./mailgun-client'),
  SendgridClient = require('./sendgrid-client'),
  MailgunMailBuilder = require('./mailgun-mail-builder'),
  SendgridMailBuilder = require('./sendgrid-mail-builder');

/**
 * Provide mail services management, decide which mail server should go to
 */
class MailServicesManager {

  constructor(serverName='') {
    if(typeof serverName == 'string') {
      this.serverName = serverName;
      //this.setClient(serverName);
    }

  }

  /**
   * Send email
   */
  sendMail(data) {

    let mail;

    if(this.serverName == 'mailgun') {
      mail = MailgunMailBuilder.create(data);
    }
    else if(this.serverName == 'sendgrid') {

      mail = SendgridMailBuilder.create(data);
    }

    const body = mail.toJSON();

    try {
      return this.client.send(body)
                        .catch(error => {
                           console.log(error.response)
                        });
    } catch (error) {
      return Promise.reject(new Error(400));
    }

    return this.client.send(data)
                      .catch(error => {
                        console.log(error.response)
                      });

  }

  /**
   * Set Server Name
   */
  setServerName(serverName) {
    this.serverName = serverName;
  }

  /**
   * Set client
   */
  setClient(method, endpoint) {

    if(this.serverName == 'sendgrid') {
      this.client = new SendgridClient(method, endpoint);
      console.log('Create a new sendgrid client.');
    }

    if(this.serverName == 'mailgun') {
      console.log('create a mailgun client.');
      this.client = new MailgunClient(method, endpoint);
    }
  }

}

//Export singleton instance
module.exports = new MailServicesManager();
