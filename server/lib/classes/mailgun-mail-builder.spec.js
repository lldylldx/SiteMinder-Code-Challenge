'use strict';

/**
 * Dependencies
 */

const MailgunMailBuilder = require('./mailgun-mail-builder.js');

const data = {
   "to":[{"email":"lldylldx@gmail.com","name":"Peter Tan"}],
   "cc":[{"email":"abc@test.com","name":"Wei Zhao"}],
   "bcc":[{"email":"Sofia.Tan@future.com","name":"Sofia Tan"}],
   "subject":"Hello, World! By Future!",
   "from":{"email":"Jennifer.Tan@future.com","name":"Jennifer Tan"},
   "content":[{"type":"text/plaint","value":"Hello, world!"}]};

const mail = MailgunMailBuilder.create(data);
const body = mail.toJSON(mail);
console.log(data);
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
console.log(JSON.stringify(body));
