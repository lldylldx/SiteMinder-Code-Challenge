'use strict';



/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  MailServersManager = require('../../../../server/lib/classes/validator');

/**
 * Tests
 */
describe('Validator', function(){
  //Test data
  const reqBody = { to: [ { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ],
  cc: [ { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ],
  bcc: [ { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ],
  //subject: 'Hello, World! By Sendgrid!',
  //from: { email: 'sam.smith@example.com', name: 'Sam Smith' },
  content:
   [ { type: 'text/html',
       value: '<html><p>Hello, world!</p></html>' } ] };

   const reqBody1 = { to: [ { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ],
   cc: [ { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ],
   bcc: [ { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ],
   subject: 'Hello, World! By Sendgrid!',
   from: { email: 'sam.smith@example.com', name: 'Sam Smith' },
   content:
    [ { type: 'text/html',
        value: '<html><p>Hello, world!</p></html>' } ] };

  //let validator;
  //isParametersMissing
  describe('isParametersMissing()', ()=>{

    it('should return true for missing parameters in Request Body', ()=>{
      Validator.setReqBody(reqBody);
      expect(Validator.isParametersMissing()).to.be.true;
    });

    it('should return false for no missing parameters in Request Body', ()=>{
      Validator.setReqBody(reqBody1);
      expect(!Validator.isParametersMissing()).to.be.true;
    });
  });

  describe('getMissingParameters()', ()=>{

    it('should return "from" for the missing parameter in Request Body', ()=>{
      Validator.setReqBody(reqBody);
      Validator.checkParametersMissing();
      expect(Validator.getMissingParameters()).to.have.lengthOf(2);
      expect(Validator.getMissingParameters()).to.include('from');
    });
  });

  describe('isParametersValid()', ()=>{
    it('should return true for the right format Request Body', ()=>{
      Validator.setReqBody(reqBody1);
      expect(Validator.isParametersValid()).to.be.true;
    });
  });
});
