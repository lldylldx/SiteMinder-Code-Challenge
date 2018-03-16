'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  sendgridHeartbeater = require('../../../../server/lib/helpers/sendgrid-heartbeater');

sendgridHeartbeater().then((v) => {
  console.log('The server is : ' + v);
});
