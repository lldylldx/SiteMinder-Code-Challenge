'use strict';

/**
 * Dependencies
 */
const
  Isemail = require('isemail'),
  isValidEmailProperty = require('../helpers/validate-email-property');
/**
* Validator class
*/
class Validator {

  /**
   * Constructor
   */
  constructor(reqBody) {

    if (reqBody) {
      this.reqBody = reqBody;
    }
    this.invalidParams = new Set();
    //this.missingParams = [];
  }

  isParametersMissing() {

    if (this.reqBody.hasOwnProperty('to') && this.reqBody.hasOwnProperty('from')
        && this.reqBody.hasOwnProperty('subject') && this.reqBody.hasOwnProperty('content')) {
      return false;
    }
    return true;
  }

  /**
   * Find invalid emails in request.
   */
  findEmailsInvalid() {
    //mandatory property
    if(!isValidEmailProperty(this.reqBody.to)) {
      this.invalidParams.add("to");
    }
    //mandatory property
    if(!isValidEmailProperty(this.reqBody.from)) {
      this.invalidParams.add("from");
    }
    //optional property
    if (this.reqBody.hasOwnProperty('cc')) {
      if(!isValidEmailProperty(this.reqBody.cc)) {
        this.invalidParams.add("cc");
      }
    }
    //optional property
    if (this.reqBody.hasOwnProperty('bcc')) {
      if(!isValidEmailProperty(this.reqBody.bcc)) {
        this.invalidParams.add("bcc");
      }
    }
  }

  /**
   * find invalid properties
   */
  findParametersMissing() {
    //const missing_params = [];
    if (!this.reqBody.hasOwnProperty('to')) {

      this.invalidParams.add("to");
    }

    if (!this.reqBody.hasOwnProperty('from')) {
      this.invalidParams.add("from");
    }

    if (!this.reqBody.hasOwnProperty('subject')) {
      this.invalidParams.add("subject");
    }

    if (!this.reqBody.hasOwnProperty('content')) {
      this.invalidParams.add("content");
    }

    //return this.invalidParams;
  }

  /**
   * Check email input format to find invalid ones
   */
  findParametersValid() {

    //check if property missing
    if(this.isParametersMissing()) {
      this.findParametersMissing();
    }
    //check if email format is invalid
    this.findEmailsInvalid();
    //return true;
  }


  /**
   * Set this.reqBody
   */
  setReqBody(reqBody) {
    if (typeof reqBody === 'undefined') {
      return;
    }
    this.reqBody = reqBody;
  }

  getInvalidPramaters() {

    //console.log(this.invalidParams.toString());
    return Array.from(this.invalidParams);
  }

  /*getMissingParameters() {
    return this.missingParams;
  }*/

}


  //Export class
module.exports = Validator;
