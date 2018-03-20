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

    if (this.reqBody['to'] && this.reqBody['from']
        && this.reqBody['subject'] && this.reqBody['content']) {
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
      this.invalidParams.add({"invalid":"to"});
    }
    //mandatory property
    if(!isValidEmailProperty(this.reqBody.from)) {
      this.invalidParams.add({"invalid":"from"});
    }
    //optional property
    if (this.reqBody['cc']) {
      if(!isValidEmailProperty(this.reqBody.cc)) {
        this.invalidParams.add({"invalid":"cc"});
      }
    }
    //optional property
    if (this.reqBody['bcc']) {
      if(!isValidEmailProperty(this.reqBody.bcc)) {
        this.invalidParams.add({"invalid":"bcc"});
      }
    }
  }

  /**
   * find invalid properties
   */
  findParametersMissing() {
    //const missing_params = [];
    if (!this.reqBody['to']) {

      this.invalidParams.add({"missing":"to"});
    }

    if (!this.reqBody['from']) {
      this.invalidParams.add({"missing":"from"});
    }

    if (!this.reqBody['subject']) {
      this.invalidParams.add({"missing":"subject"});
    }

    if (!this.reqBody['content']) {
      this.invalidParams.add({"missing":"content"});
    }

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

  /**
   * return invalid params
   */
  getInvalidPramaters() {

    //console.log(this.invalidParams.toString());
    return Array.from(this.invalidParams);
  }

}


  //Export class
module.exports = Validator;
