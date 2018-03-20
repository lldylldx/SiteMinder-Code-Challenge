'use strict';

/**
 * Dependencies
 */
 const
   expect = require('chai').expect,
   EmailAddress = require('../../../../server/lib/classes/email-address');

/**
 * Tests
 */
describe('EmailAddress', function() {

  //Test data
  const data = [
    'test@example.org',
    'Test <test@example.org>',
    {name: 'Test', email: 'test@example.org'},
  ];

  //Set email
  describe('setEmail()', () => {
    let email;
    beforeEach(function() {
      email = new EmailAddress();
    });

    it('should set the email address', () => {
      email.setEmail('test@example.org');
      expect(email.email).to.equal('test@example.org');
    });
    it('should throw an error for invalid input', () => {
      expect(function() {
        email.setEmail(5);
      }).to.throw(Error);
      expect(function() {
        email.setEmail(null);
      }).to.throw(Error);
    });
    it('should throw an error for no input', () => {
      expect(function() {
        email.setEmail();
      }).to.throw(Error);
    });
  });

  //Set name
  describe('setName()', () => {
    let email;
    beforeEach(function() {
      email = new EmailAddress();
    });

    it('should set the name', () => {
      email.setName('Test');
      expect(email.name).to.equal('Test');
    });
    it('should throw an error for invalid input', () => {
      expect(function() {
        email.setName(5);
      }).to.throw(Error);
      expect(function() {
        email.setName(null);
      }).to.throw(Error);
    });
    it('should accept no input', () => {
      expect(function() {
        email.setName();
      }).not.to.throw(Error);
    });
  });

  //To JSON
  describe('toJSON()', () => {
    let emails;
    beforeEach(function() {
      emails = data.map(email => EmailAddress.create(email));
    });

    it('should always have the email field', () => {
      emails.forEach(email => {
        const json = email.toJSON();
        expect(json).to.have.property('email');
        expect(json.email).to.equal(email.email);
      });
    });
    it('should have the name field if given', () => {
      emails.filter(email => email.name !== '').forEach(email => {
        const json = email.toJSON();
        expect(json).to.have.property('name');
        expect(json.name).to.equal(email.name);
      });
    });
    it('should not have the name field if not given', () => {
      emails.filter(email => email.name === '').forEach(email => {
        const json = email.toJSON();
        expect(json).not.to.have.property('name');
      });
    });
  });

  //From data
  describe('fromData()', () => {
    let email;
    beforeEach(function() {
      email = new EmailAddress();
    });

    it('should handle email address strings', () => {
      email.fromData(data[0]);
      expect(email.email).to.equal('test@example.org');
      expect(email.name).to.equal('');
    });
    it('should handle name and email address strings', () => {
      email.fromData(data[1]);
      expect(email.email).to.equal('test@example.org');
      expect(email.name).to.equal('Test');
    });
    it('should handle objects', () => {
      email.fromData(data[2]);
      expect(email.email).to.equal('test@example.org');
      expect(email.name).to.equal('Test');
    });
    it('should throw an error for invalid input', () => {
      expect(() => {
        email.fromData(5);
      }).to.throw(Error);
    });
  });

  //Static create method
  describe('create()', () => {
    let emails;
    beforeEach(function() {
      emails = data.map(email => EmailAddress.create(email));
    });

    it('should create email address instances from given data', () => {
      emails.forEach(email => {
        expect(email).to.be.an.instanceof(EmailAddress);
      });
    });
    it('should have the expected properties for each email', () => {
      emails.forEach(email => {
        expect(email).to.have.property('email');
        expect(email).to.have.property('name');
      });
    });
    it('should handle arrays', () => {
      const emailsArr = EmailAddress.create(data);
      expect(emailsArr).to.be.an.instanceof(Array);
      expect(emailsArr).to.have.lengthOf(3);
      emailsArr.forEach(email => {
        expect(email).to.be.an.instanceof(EmailAddress);
        expect(email).to.have.property('email');
        expect(email).to.have.property('name');
      });
    });
    it('should handle instances of EmailAddress', () => {
      const email1 = new EmailAddress({email: 'test@example.org'});
      const email2 = EmailAddress.create(email1);
      expect(email2).to.be.an.instanceof(EmailAddress);
      expect(email2.email).to.equal(email1.email);
    });
  });
});
