'use strict';

/**
* Dependencies
*/
const
  mailServersManager = require('../classes/mail-servers-manager'),
  mailgunHeartbeater = require('./mailgun-heartbeater'),
  sendgridHeartbeater = require('./sendgrid-heartbeater');

module.exports = async function serversStatusCheck () {

  //check mailgun & sendgrid server, then set server status in MailServersManager
  const [resultMailgun, resultSendgrid] = await Promise.all([
    mailgunHeartbeater(),
    sendgridHeartbeater()
  ]);
  //if mailgun res success ...
  if(resultMailgun) {
    console.log('The mailgun server is: active');
    checkStatus('mailgun', resultMailgun);

    //if no primary server is setting then set 'mailgun' as is, coz it's alive
    if(mailServersManager.getPrimServer() == 'null') {
        mailServersManager.setPrimServer('mailgun');
    }
  }

  if(resultSendgrid) {
    console.log('The sendgrid server is: active');
    checkStatus('sendgrid', resultSendgrid);
  }

  // if primary server is down 3 times then change the primary server to the other one.
  if(mailServersManager.getPrimServDownTime() > 3) {
    const anotherServer = mailServersManager.isMailServiceOn();
    // set a new active primary server and reset down time to 0
    mailServersManager.setPrimServer(anotherServer);
    mailServersManager.resetPrimServDownTime();
  }
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  console.log('The primary server: ' + mailServersManager.getPrimServer());
  console.log('The mailgun server status: ' + mailServersManager.getServerStatus('mailgun'));
  console.log('The sendgrid server status: ' + mailServersManager.getServerStatus('sendgrid'));
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
}

function checkStatus(servName, result) {

  //Set mailgun server status to 'active' if result is true
  if(result) {
    mailServersManager.setServerActive(servName);
  }
  else {
    mailServersManager.setServerDown(servName);
    // if mailgun is the primary server then add the down time by 1
    if(mailServersManager.getPrimServer() == servName) {
      mailServersManager.addPrimServDownTime();
    }
  }
  return true;

}
