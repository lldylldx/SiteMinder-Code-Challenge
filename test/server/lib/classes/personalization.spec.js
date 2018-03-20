'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  Personalization = require('../../../../server/lib/classes/personalization'),
  EmailAddress = require('../../../../server/lib/classes/email-address');

/**
 * Tests
 */
describe('Personalization', function() {

  //Create new personalization before each test
  let p;
  beforeEach(function() {
    p = new Personalization();
  });

  //JSON conversion
  describe('toJSON()', function() {
    beforeEach(function() {
      p.setTo('test@example.org');
    });

    it('should always have the to field', function() {
      const json = p.toJSON();
      //console.log(json);
      expect(json).to.have.property('to');
      expect(json.to).to.be.an.instanceof(Array);
      expect(json.to).to.have.a.lengthOf(1);
      expect(json.to[0]).to.be.an.instanceof(EmailAddress);
      expect(json.to[0].email).to.equal('test@example.org');
    });

    it('should set the cc field', function() {
      p.setCc('testcc@example.org');
      const json = p.toJSON();
      expect(json).to.have.property('cc');
      expect(json.cc).to.be.an.instanceof(Array);
      expect(json.cc).to.have.a.lengthOf(1);
      expect(json.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(json.cc[0].email).to.equal('testcc@example.org');
    });

    it('should set the bcc field', function() {
      p.setBcc('testbcc@example.org');
      const json = p.toJSON();
      expect(json).to.have.property('bcc');
      expect(json.bcc).to.be.an.instanceof(Array);
      expect(json.bcc).to.have.a.lengthOf(1);
      expect(json.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(json.bcc[0].email).to.equal('testbcc@example.org');
    });

  });
});
