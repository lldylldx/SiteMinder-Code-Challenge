'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  MailServersManager = require('../../../../server/lib/classes/mail-services-manager');

const mailServersManager = new MailServersManager();

/**
 * Tests
 */
describe('addNewServer()',  () => {

  const
    serv01 = ['google','down'],
    serv02 = ['facebook', 'live'];

  it('should return true with parameters ["google","down"]', ()=> {
    expect(MailServersManager.addNewServer(serv01[0], serv01[1])).to.be.true;
    expect(MailServersManager.hasMailServer(serv01[0])).to.eql("down");
    expect(MailServersManager.hasMailServer('mailgun')).to.eql("active");
    expect(MailServersManager.hasMailServer('mailgun')).to.eql("active");
  });

});
