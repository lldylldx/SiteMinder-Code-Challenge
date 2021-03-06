'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  mailgunHeartbeater = require('../../../../server/lib/helpers/mailgun-heartbeater');


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
