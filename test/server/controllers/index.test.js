'use strict';

/**
 * Dependencies
 */

 const
  expect = require('chai').expect,
  httpMocks = require('node-mocks-http'),
  sendMailController = require('../../../server/controllers/apis/mails');


 /**
  * Tests
  */
describe('Test controllers', () => {

  const data = {
    from: {"email":"test@test.com"},
    to: [{"email":"lldylldx@gmail.com"}],
    subject: '1',
    content:[{"type":"text/plaint","value":"Hello, world from the future!"}]
  };

  let request, response;

  it('should return 200 with right format', () => {

    request  = httpMocks.createRequest({
            method: 'POST',
            url: '/send',
            body: data
        });
    response = httpMocks.createResponse();
    sendMailController(request, response);


    expect(response.statusCode).to.equal(200);

  });

});
