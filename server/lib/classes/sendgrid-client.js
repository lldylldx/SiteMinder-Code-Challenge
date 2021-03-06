'use strict';

/**
 * Dependencies
 */
const
  config = require('../../../configs'),
  axios = require('axios');

 /**
  * Sendgrid REST Client
  */
 class SendgridClient {

   /**
    * Constructor
    */
   constructor(method='', endpoint='') {

     this.apiKey = config.sendgridApiKey;
     this.baseURL = config.sendgridApiBaseURL;
     this.headers = {
       'Accept': 'application/json'
     };
     this.headers = {};
     this.method = method;
     this.endPoint = endpoint;
     //this.data = data;
   }

   /**
    * Send Http Request by calling axios function
    */
   send(data) {

     console.log('In SendgridClient.send()....');

     console.log(JSON.stringify(data));
     //set the api key
     this.setHeader('Authorization', 'Bearer '+this.apiKey);
     const url = this.baseURL + this.endPoint;
     console.log('Calling axios post ....');

     return  axios({method: this.method, url: url, data: data, headers: this.headers})
               .catch(error => {
                  console.log(error.response)
              });

   }

   /**
    * Set API key
    */
   setApiKey(apiKey) {
     this.apiKey = apiKey;
   }

   /**
    * Get API key
    */
   getApiKey(apiKey) {
     this.apiKey = apiKey;
   }

   /**
    * Set default header
    */
   setHeader(key, value) {
     this.headers[key] = value;
   }

   /**
    * Get default header
    */
   getHeader(key) {
     return this.headers[key];
   }

   /**
    * Set endpoint
    */
   setEndPoint(endPoint) {
     this.endpoint = endPoint;
   }

   /**
    * Get endpoint
    */
   getEndPoint(key) {
     return this.endpoint;
   }

   /**
    * Set method
    */
   setMethod(method) {
     this.method = method;
   }

   /**
    * Get method
    */
   getMethod() {
     return this.method;
   }

 }

 module.exports = SendgridClient;
