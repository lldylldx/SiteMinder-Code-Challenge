'use strict';

/**
 * Dependencies
 */

const SendgridMailBuilder = require('./sendgrid-mail-builder.js');

const data = {
   "to":[{"email":"lldylldx@gmail.com","name":"Wei Zhao"}],
   "cc":[{"email":"abc@test.com","name":"Wei Zhao"}],
   "bcc":[{"email":"bcd@test.com","name":"Wei Zhao"}],
   "subject":"Hello, World! By Sendgrid!",
   "from":{"email":"sam.smith@example.com","name":"Sam Smith"},
   "content":[{"type":"text/plaint","value":"Hello, world!"}]};

const mail = SendgridMailBuilder.create(data);
const body = mail.toJSON(mail);
console.log(data);
console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
console.log(JSON.stringify(body));
