'use strict';

/**
 * Dependencies
 */
 const
   expect = require('chai').expect,
   MailgunEmailAddress = require('../../../../server/lib/classes/mailgun-email-address');

/**
 * Tests
 */

describe('MailgunEmailAddress', function() {

  const data = [{"email":"lldylldx@gmail.com","name":"Peter Tan"},{"email":"abc@test.com","name":"Wei Zhao"}];
  const data1 = {"email":"lldylldx@gmail.com","name":"Peter Tan"};

  //Create new SendgridMailBuilder before each test
  let emailAdresses, body;

  beforeEach(function() {
     emailAdresses = MailgunEmailAddress.create(data);
     body = emailAdresses.toString();
  });

  //JSON conversion
  describe('toString()', function() {

    it('should merge email array into a string', function() {

      expect(body).to.equal('Peter Tan <lldylldx@gmail.com>,Wei Zhao <abc@test.com>');
    });

  });

});
