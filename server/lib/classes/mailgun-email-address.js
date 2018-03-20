'use strict';

/**
 * Dependencies
 */

class MailgunEmailAddress {

  /**
	 * Constructor
	 */
   constructor(data) {
     this.emailaddress =[];
     //Construct from data
     if (data) {
       this.fromData(data);
     }
   }

   /**
    * From data
    */
   fromData(data) {

     //Expecting object
     if (typeof data !== 'object') {
       throw new Error('Expecting object or string for EmailAddress data');
     }

     //String given
     /*if (typeof data === 'string') {
       const [name, email] = splitNameEmail(data);
       data = {name, email};
     }*/
     const {email, name} = data;

     if(typeof name !== 'undefined') {
       this.merge(email, name);
     }
     else {
       this.emailaddress.push(email);
     }

   }

   merge(email, name) {
     if(typeof email !==  'string' && typeof name !== 'string') {
       throw new Error('Expecting string for EmailAddress data.');
     }
     console.log(email + ' : ' + name);
     this.emailaddress.push(name.concat(' <').concat(email).concat('>'));

   }

   toString() {
     return this.emailaddress.join(',');
   }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create an EmailAddress instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of EmailAddress class?
    if (data instanceof MailgunEmailAddress) {
      return data;
    }

    //Create instance
    return new MailgunEmailAddress(data);
  }


}


//Export class
module.exports = MailgunEmailAddress;
