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
   constructor(method='', endpoint='', data={}) {
     this.apiKey = config.mailgunApiKey;
     this.baseURL = config.mailgunApiBaseURL;
     this.method = method;
     this.endPoint = endpoint;
     //this.data = data;
   }

   /**
    * Send Http Request by calling axios function
    */
   send(data) {

     console.log('In MailgunClient.send()...');
     console.log(JSON.stringify(data));
     //set the api key
     const auth = {
       username: 'api',
       password: this.apiKey
     };
     const url = this.baseURL + this.endPoint;

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
    * Set data
    */
   setData(data) {
      this.data = data;
   }

   /**
    * Get data
    */
   getData(data) {
      this.data = data;
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
