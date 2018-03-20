'use strict';

/**
 * Dependencies
 */
 const
   expect = require('chai').expect,
   SendgridMailBuilder = require('../../../../server/lib/classes/sendgrid-mail-builder');

/**
 * Tests
 */

describe('SendgridMailBuilder', function() {

  const data = {
     "to":[{"email":"lldylldx@gmail.com","name":"Wei Zhao"}],
     "cc":[{"email":"abc@test.com","name":"Wei Zhao"}],
     "bcc":[{"email":"bcd@test.com","name":"Wei Zhao"}],
     "subject":"Hello, World! By Sendgrid!",
     "from":{"email":"sam.smith@example.com","name":"Sam Smith"},
     "content":[{"type":"text/plaint","value":"Hello, world!"}]};

  //Create new SendgridMailBuilder before each test
  let mail;

  beforeEach(function() {
     mail = SendgridMailBuilder.create(data);
  });

  //JSON conversion
  describe('toJSON()', function() {

    it('should always have the from field', function() {
      const json = mail.toJSON();
      //console.log(json);
      expect(json).to.have.property('from');
      expect(json.from).to.be.an.instanceof(Object);
      expect(json.from).to.deep.equal({"email":"sam.smith@example.com","name":"Sam Smith"});
    });

  });

});
