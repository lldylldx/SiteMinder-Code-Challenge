'use strict';

/**
 * Dependencies
 */
const
    express = require('express'),
    mailService = require('../../../services/mails'),
    Validator = require('../../../lib/classes/validator'),
    buildJsonResponse = require('../../../lib/helpers/build-json-resp'),
    sqsService = require('../../../lib/helpers/sqs-client');

//set a global var to monitor event loop
const interval = 5000;
const lag = require('event-loop-lag')(interval);

let router = express.Router();

// Validate incoming request format validation.
router.use('/send', (req, res, next) => {

  console.log('event loop lag is: '+lag());

  if(lag() >= 70) {
    //create a child process to send request to AWS SQS, then return.
    console.log('Node Server is too busssssssy.');
    //build a response and send 503
    return next(res.json());
  }
  // validate the request
  const validator = new Validator(req.body);
  validator.setReqBody(req.body);
  validator.findParametersValid();
  const arrInvalidParams = validator.getInvalidPramaters();

  if (arrInvalidParams.length > 0) {
    const resJson = buildJsonResponse(arrInvalidParams);
    return next(res.status(resJson.code).json({"errors":resJson.errors}));
  }

  // add AWS SQS to support offload traffic when node server is a bit busy
  if(lag() < 70 && lag() > 10) {
  //if(true) {  // for test.
    const body = JSON.stringify(req.body);
    //need to offload from node server and push message to AWS SQS
    sqsService.sendOptions.MessageBody = body;
    sqsService.sendMessage(sqsService.sendOptions, (err, data) =>{
      console.log('Sent to AWS SQS, data: '+ JSON.stringify(data));
      //check if successfully sent to AWS SQS
      if(data.hasOwnProperty('MessageId')) {
        //build a response and send
        const resJson = buildJsonResponse();
        return next(res.status(200).json(resJson.message));
      }
      else { // should return an server error.
        const response = {
          'errors': [{"message":"Internal Server Error"}]
        };

        return next(res.status(500).json(response));
     }
    });

  }

  return next();

});

//router.get('/send', mailService.sendMails);

router.post('/send', mailService.sendMails);

module.exports = router;
