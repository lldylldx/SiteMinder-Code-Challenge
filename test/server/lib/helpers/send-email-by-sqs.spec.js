'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  mailgunHeartbeater = require('../../../../server/lib/helpers/send-email-by-sqs');


  /**
   * Tests
   */
 describe('mailgunHeartbeater()', () => {


   it('should return true with mailgun server is active', () => {

     mailgunHeartbeater().then((v)=>{

      expect(v).to.be.true;
      return;

     })
   });

 })
