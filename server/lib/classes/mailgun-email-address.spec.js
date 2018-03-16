'use strict';

/**
 * Dependencies
 */

const MailgunEmailAddress = require('./mailgun-email-address');

const data = [{"email":"lldylldx@gmail.com","name":"Peter Tan"},{"email":"abc@test.com","name":"Wei Zhao"}];
const data1 = {"email":"lldylldx@gmail.com","name":"Peter Tan"};

try {

  let emailAdresses = MailgunEmailAddress.create(data);
  let body = emailAdresses.toString();

  console.log(data);
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
  console.log(body);

  emailAdresses = MailgunEmailAddress.create(data1);
  body = emailAdresses.toString();
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
  console.log(data);
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++');
  console.log(body);

} catch(error) {
  console.log(error);
};
