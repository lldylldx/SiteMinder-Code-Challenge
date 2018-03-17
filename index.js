'use strict'

/**
 * Dependencies
 */
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
const sleep = require('sleep');

const  filePath = path.join(process.cwd()+'/configs/', 'local.js');

if (!fs.existsSync(filePath)) {

  console.log('Can\'t fetch config file from AWS s3, Sever will be shut down.');
  process.exit();

}

console.log('Fetched the config file from AWS s3, Sever will be started...');

const server = require('./server')(),
      config = require('./configs');

server.create(config);
server.start();


/*console.log('The primary server: ' + mailServersManager.getPrimServer());
console.log('The mailgun server status: ' + mailServersManager.getServerStatus('mailgun'));
console.log('The sendgrid server status: ' + mailServersManager.getServerStatus('sendgrid'));*/
//start the heartbeats checking service.


//schedule.scheduleJob('*/15 * * * * *', serversStatusCheck);
