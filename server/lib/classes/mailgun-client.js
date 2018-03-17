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
 class MailgunClient {

   /**
    * Constructor
    */
   constructor(method='', endpoint='') {
     this.apiKey = config.mailgunApiKey;
     this.baseURL = config.mailgunApiBaseURL;
     this.domain = config.mailgunDomain;
     this.method = method;
     this.endPoint = endpoint;
     //this.data = data;
   }

   /**
    * Send Http Request by calling axios function
    */
   send(data) {

     console.log('In MailgunClient.send()...');
     //console.log(JSON.stringify(data));
     //set the api key
     const auth = {
       username: 'api',
       password: this.apiKey
     };
     const url = this.baseURL + this.domain + this.endPoint;

     console.log('api url is: ' + url);
     console.log('data is ' + JSON.stringify(data));

     try {
       return axios({method: this.method, url: url, auth: auth, params: data})
              .catch(error => {
                  console.log(error.response)
              });
     }
     catch(error) {
       return Promise.reject(new Error(400));
     }

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
    * Set endpoint
    */
   setEndPoint(endPoint) {
     this.endpoint = endPoint;
   }

   /**
    * Get endpoint
    */
   getEndPoint() {
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

 module.exports = MailgunClient;
