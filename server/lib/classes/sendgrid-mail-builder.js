'use strict';

/**
 * Dependencies
 */
const
  EmailAddress = require('./email-address'),
  Personalization = require('./personalization'),
  toCamelCase = require('../helpers/to-camel-case'),
  toSnakeCase = require('../helpers/to-snake-case'),
  deepClone = require('../helpers/deep-clone'),
  arrayToJSON = require('../helpers/array-to-json');

/**
* Sendgrid mail builder
*/
class SendgridMailBuilder {

  /**
  * Constructor
  */
  constructor(data) {
    //Init array and object placeholders
    this.personalizations = [];
    this.from = {};
    this.content = [];

    //this.customArgs = [];
    this.mailSettings = [];

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
      to, from, cc, bcc, subject, content, mailSettings
    } = data;

    //Set data
    this.setFrom(from);
    this.setSubject(subject);
    this.setContent(content);
    this.setMailSettings(mailSettings);
    this.addTo(to, cc, bcc);
    //Add contents from text/plain properties
    //this.addTextContent(text);

    //Using "to" property for personalizations
    /*if (personalizations) {
      this.setPersonalizations(personalizations);
    }*/

    //Multiple individual emails
    /*else if (isMultiple && Array.isArray(to)) {
      to.forEach(to => this.addTo(to, cc, bcc));
    }
    //Single email (possibly with multiple recipients in the to field)
    else {
      this.addTo(to, cc, bcc);
    }*/

  }


  /**
   * Set from email
   */
  setFrom(from) {
    if (typeof from === 'undefined') {
      return;
    }
    this.from = EmailAddress.create(from);
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
   * Convenience method for quickly creating personalizations
   */
  addTo(to, cc, bcc) {
    if (
      typeof to === 'undefined' &&
      typeof cc === 'undefined' &&
      typeof bcc === 'undefined'
    ) {
      throw new Error('Provide at least one of to, cc or bcc');
    }
    this.addPersonalization(new Personalization({to, cc, bcc}));
  }

  /**
   * Add personalization
   */
  addPersonalization(personalization) {

    //Convert to class if needed
    if (!(personalization instanceof Personalization)) {
      personalization = new Personalization(personalization);
    }

    this.personalizations.push(personalization);
  }

  /**
   * Set content
   */
  setContent(content) {
    if (typeof content === 'undefined') {
      return;
    }
    if (!Array.isArray(content)) {
      throw new Error('Array expected for `content`');
    }
    this.content = content;
  }


  /**
   * Add content
   */
  addContent(content) {
    if (typeof content !== 'object') {
      throw new Error('Object expected for `content`');
    }
    this.content.push(content);
  }

  /**
   * Add text content
   */
  addTextContent(text) {
    if (typeof text === 'undefined') {
      return;
    }
    if (typeof text !== 'string') {
      throw new Error('String expected for `text`');
    }
    this.addContent({
      value: text,
      type: 'text/plain',
    });
  }

  /**
   * Set mail settings
   */
  setMailSettings(settings) {
    if (typeof settings === 'undefined') {
      return;
    }
    if (typeof settings !== 'object') {
      throw new Error('Object expected for `mailSettings`');
    }
    this.mailSettings = settings;
  }

  /**
   * To JSON
   */
  toJSON() {

    //Extract properties from self
    const {
      from, subject, content, personalizations, mailSettings
    } = this;

    //Initialize with mandatory values
    const json = {
      from, subject,
      personalizations: arrayToJSON(personalizations),
    };

    //Array properties
    if (Array.isArray(content) && content.length > 0) {
      json.content = arrayToJSON(content);
    }

    //Object properties
    if (Object.keys(mailSettings).length > 0) {
      json.mailSettings = mailSettings;
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

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of Mail class?
    if (data instanceof SendgridMailBuilder) {
      return data;
    }

    //Create instance
    return new SendgridMailBuilder(data);
  }

}

 module.exports = SendgridMailBuilder;
