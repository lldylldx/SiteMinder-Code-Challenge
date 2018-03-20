'use strict'

/**
 * Dependencies
 */
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
const { fork } = require('child_process');
const serversStatusCheck = require('./server/lib/helpers/servers-status-check');

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

// fork a child process to handle AWS SQS queue messages.
const grabAndSend = fork('./server/lib/helpers/send-email-by-sqs.js');

//start the heartbeats checking service.
schedule.scheduleJob('*/15 * * * * *', serversStatusCheck);
