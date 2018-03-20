'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  sendgridHeartbeater = require('../../../../server/lib/helpers/sendgrid-heartbeater');


  /**
   * Tests
   */
 describe('sendgridHeartbeater()', () => {


   it('should return true with the sendgrid server is active', () => {

     sendgridHeartbeater().then((v)=>{

      expect(v).to.be.true;
      return;

     })
   });

 })
