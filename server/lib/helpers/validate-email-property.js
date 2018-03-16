'use strict';

/**
 * Dependencies
 */
const Isemail = require('isemail');

/**
 * Helper to validate email property
 */
module.exports = function isValidEmailProperty(arr) {
  if(typeof arr == 'undefined') {
    return false;
  }

  let isValid = true;
  // Based on sendgrid api, maxItems is 1000
  if(arr.length >= 1000) {
    return false;
  }
  for(let i = 0; i < arr.length; i++){
    if ( arr[i].hasOwnProperty('email') ) {
      if( arr[i].email === null || typeof arr[i].email === "undefined" ) {
        return false;
      }
      //email format is wrong
      if( !Isemail.validate(arr[i].email) ) {
        return false;
      }
    }
    else {
      return false;
    }
  }
  return true;
};
