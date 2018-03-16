'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  isValidEmailProperty = require('../../../../server/lib/helpers/validate-email-property');

/**
 * Tests
 */
describe('isValidEmailProperty', ()=>{

  const emailArr1 = [ { email: 'lldylldx@gmail.com', name: 'Wei Zhao' }, { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ];
  const emailArr2 = [ { email: '*lldy..lldx@gmail.com', name: 'Wei Zhao' }, { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ];
  const emailArr3 = [ { email: '', name: 'Wei Zhao' }, { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ];
  const emailArr4 = [ { name: 'Wei Zhao' }, { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ];
  const emailArr5 = [ { email: null, name: 'Wei Zhao' }, { email: 'lldylldx@gmail.com', name: 'Wei Zhao' } ];

  describe('isValidEmailProperty()', ()=>{

    it('should return true for validate email property', ()=>{
      expect( isValidEmailProperty(emailArr1) ).to.be.true;
    });

    it('should return false for invalidate email format', ()=>{
      expect( !isValidEmailProperty(emailArr2) ).to.be.true;
    });

    it('should return false for invalidate email format -- empty value', ()=>{
      expect( !isValidEmailProperty(emailArr3) ).to.be.true;
    });

    it('should return false for invalidate email format -- missing email property', ()=>{
      expect( !isValidEmailProperty(emailArr4) ).to.be.true;
    });

    it('should return false for invalidate email format -- undefined', ()=>{
      expect( !isValidEmailProperty(emailArr5) ).to.be.true;
    });
  })

});
