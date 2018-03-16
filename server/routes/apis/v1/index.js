'use strict';

const
    express = require('express'),
    sendMailController = require('../../../controllers/apis/mails');

let router = express.Router();

router.use('/mail', sendMailController);

module.exports = router;
