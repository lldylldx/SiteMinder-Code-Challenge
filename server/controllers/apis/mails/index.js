'use strict';

/**
 * Dependencies
 */
const
    express = require('express'),
    mailService = require('../../../services/mails'),
    Validator = require('../../../lib/classes/validator'),
    buildJsonResponse = require('../../../lib/helpers/build-json-resp');

let router = express.Router();

// Validate incoming request format validation.
router.use('/send', (req, res, next) => {
  const validator = new Validator(req.body);
  validator.setReqBody(req.body);
  validator.findParametersValid();
  const arrInvalidParams = validator.getInvalidPramaters();
  if (arrInvalidParams.length > 0) {
    const resJson = buildJsonResponse('400', arrInvalidParams);
    return next(res.json(resJson));
  }

  return next();

});

//router.get('/send', mailService.sendMails);

router.post('/send', mailService.sendMails);

module.exports = router;
