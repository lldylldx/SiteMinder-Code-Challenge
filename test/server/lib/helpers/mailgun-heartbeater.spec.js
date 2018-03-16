'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  mailgunHeartbeater = require('../../../../server/lib/helpers/mailgun-heartbeater');

mailgunHeartbeater().then((v) => {
  console.log('The server is: ' + v);
});
