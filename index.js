'use strict'

/**
 * Dependencies
 */

const server = require('./server')()
const config = require('./configs')
const schedule = require('node-schedule');
const mailServersManager = require('./server/lib/classes/mail-servers-manager');
const serversStatusCheck = require('./server/lib/helpers/servers-status-check');

server.create(config)
server.start()


/*console.log('The primary server: ' + mailServersManager.getPrimServer());
console.log('The mailgun server status: ' + mailServersManager.getServerStatus('mailgun'));
console.log('The sendgrid server status: ' + mailServersManager.getServerStatus('sendgrid'));*/
//start the heartbeats checking service.


//schedule.scheduleJob('*/15 * * * * *', serversStatusCheck);
