'use strict';

/**
 * Dependencies
 */
 const
   MailgunEmailAddress = require('./mailgun-email-address'),
   toCamelCase = require('../helpers/to-camel-case'),
   toSnakeCase = require('../helpers/to-snake-case'),
   deepClone = require('../helpers/deep-clone'),
   arrayToJSON = require('../helpers/array-to-json');


 /**
  * Mailgun mail builder
  */
class MailgunMailBuilder {

  /**
  * Constructor
  */
  constructor(data) {
    this.from = '';
    this.to = '';
    this.cc = '';
    this.bcc = '';
    this.content = '';
    //Process data if given
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * Build from data
   */
  fromData(data) {
    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    //Convert to camel case to make it workable, making a copy to prevent
    //changes to the original objects
    data = deepClone(data);
    data = toCamelCase(data);

    //Extract properties from data
    const {
      to, from, cc, bcc, subject, content
    } = data;

    console.log('content.value ' + content[0].value);

    //Set data
    this.setFrom(from);
    this.setSubject(subject);
    this.setText(content);
    this.setTo(to);
    this.setCc(cc);
    this.setBcc(bcc);

  }

  /**
   * Set from email
   */
  setFrom(from) {
    if (typeof from === 'undefined') {
      return;
    }
    this.from = MailgunEmailAddress.create(from).toString();
  }

  /**
   * Set content
   */
  setText(content) {
    if (typeof content === 'undefined') {
      return;
    }
    //default only support text/plaint format content
    this.text = content[0].value;

  }

  /**
   * Set subject
   */
  setSubject(subject) {
    if (typeof subject === 'undefined') {
      return;
    }
    if (typeof subject !== 'string') {
      throw new Error('String expected for `subject`');
    }
    this.subject = subject;
  }

  /**
   * Set to
   */
  setTo(to) {
    if (typeof to === 'undefined') {
      return;
    }
    this.to = MailgunEmailAddress.create(to).toString();
  }

  /**
   * Add a single to
   */
  /*addTo(to) {
    if (typeof to === 'undefined') {
      return;
    }
    this.to.push(EmailAddress.create(to));
  }*/

  /**
   * Set cc
   */
  setCc(cc) {
    if (typeof cc === 'undefined') {
      return;
    }

    this.cc = MailgunEmailAddress.create(cc).toString();
  }

  /**
   * Add a single cc
   */
  /*addCc(cc) {
    if (typeof cc === 'undefined') {
      return;
    }
    this.cc.push(EmailAddress.create(cc));
  }*/

  /**
   * Set bcc
   */
  setBcc(bcc) {
    if (typeof bcc === 'undefined') {
      return;
    }
    this.bcc = MailgunEmailAddress.create(bcc).toString();
  }

  /**
   * Add a single bcc
   */
  /*addBcc(bcc) {
    if (typeof bcc === 'undefined') {
      return;
    }
    this.bcc.push(EmailAddress.create(bcc));
  }*/

  /**
   * To JSON
   */
  toJSON() {

    //Extract properties from self
    const {
      from, to, cc, bcc, subject, text
    } = this;

    //Initialize with mandatory values
    const json = {
      from, to, subject, text
    };

    //Arrays
    if (typeof cc == 'string') {
      json.cc = cc;
    }
    if (typeof cc == 'string') {
      json.bcc = bcc;
    }

    //Return as snake cased object
    return toSnakeCase(json);
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create a Mail instance from given data
   */
  static create(data) {

    //Already instance of Mail class?
    if (data instanceof MailgunMailBuilder) {
      return data;
    }

    //Create instance
    return new MailgunMailBuilder(data);
  }

 }

 module.exports = MailgunMailBuilder;
