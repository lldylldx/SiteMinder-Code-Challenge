'use strict';

/**
 * Dependencies
 */

const
  expect = require('chai').expect,
  httpMocks = require('node-mocks-http'),
  routes = require('../../../server/controllers/apis/mails'),
  mailService = require('../../../server/services/mails');

 /**
  * Tests
  */
describe('Test services', () => {

  const data = {
    from: {"email":"test@test.com"},
    to: [{"email":"lldylldx@gmail.com"}],
    subject: '1',
    content:[{"type":"text/plaint","value":"Hello, world from the future!"}]
  };

  let request, response;

  it('should return 200 with right format by mailgun', () => {

    request  = httpMocks.createRequest({
            method: 'POST',
            url: '/send',
            body: data
        });
    response = httpMocks.createResponse();

    mailService.sendMails(request, response);

    expect(response.statusCode).to.equal(200);

  });

});
