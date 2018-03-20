'use strict';

/**
 * Dependencies
 */

 const
  expect = require('chai').expect,
  buildJsonResponse = require('../../../../server/lib/helpers/build-json-resp');

 /**
  * Tests
  */
 describe('buildJsonResponse', () => {

   const arr1 = [{'invalid':'to'}, {'missing':'to'}, {'invalid':'from'}];
   const arr2 = [{'invalid':'to'}, {'invalid':'from'}];
   //const arr3 = [];
   //Tests
   it('should return code 400 with arr1 as input', function() {

     const resJson = buildJsonResponse(arr1);
     //console.log(resJson.code);
     expect(resJson.code).to.equal('400');
     expect(resJson.errors[0]).to.deep.equal({
       "field": "to",
       "message": "Missing the mandatory parameter"
     });
   });

   it('should return code 402 with arr2 as input', () => {

     const resJson = buildJsonResponse(arr2);
     //console.log(resJson.code);
     expect(resJson.code).to.equal('402');
     expect(resJson.errors[0]).to.deep.equal({
       "field": "to",
       "message": "The from email does not contain a valid address"
     }, {
       "field": "from",
       "message": "The from email does not contain a valid address"
     });
   });

   it('should return code 200 with arr3 as input', function() {

     const resJson = buildJsonResponse();
     //console.log(resJson.code);
     expect(resJson.code).to.equal('200');
     expect(resJson.message.message).to.deep.equal("The email has been queued. Thank you.");
   });
});
