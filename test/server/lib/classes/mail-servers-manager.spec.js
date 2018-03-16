'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  MailServersManager = require('../../../../server/lib/classes/mail-servers-manager');

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

  it('should return false with parameters ["facebook","live"]', ()=> {
    expect(MailServersManager.addNewServer(serv02[0], serv02[1])).to.be.false;
    expect(MailServersManager.hasMailServer(serv02[0])).to.eql('null');
  });

  it('should return false with remove server "google"', ()=> {
    MailServersManager.removeServer(serv01[0]);
    expect(MailServersManager.hasMailServer(serv01[0])).to.eql('null');
  });
});

describe('getPrimServer(), setPrimServer()', () => {

  it('should return "mailgun" as default server', ()=> {
    expect(MailServersManager.getPrimServer()).to.eql('mailgun');
  });

  it('should return "sendmail" as default server after being set', ()=> {
    MailServersManager.setPrimServer('sendmail');
    expect(MailServersManager.getPrimServer()).to.eql('sendmail');
  });

});

describe('getPrimServDownTime(), addPrimServDownTime(), resetPrimServDownTime()', () => {

  it('should return primary server down time 0 as default', ()=> {
    expect(MailServersManager.getPrimServDownTime()).to.eql(0);
  });


  it('should return primary server down time 1 after addPrimServDownTime()', ()=> {
    MailServersManager.addPrimServDownTime();
    expect(MailServersManager.getPrimServDownTime()).to.eql(1);
  });


  it('should return primary server down time 0 after resetPrimServDownTime()', ()=> {
    MailServersManager.resetPrimServDownTime();
    expect(MailServersManager.getPrimServDownTime()).to.eql(0);
  });
});

describe('setServerActive(), setServerDown(), isMailServiceOn()', () => {

  it('should set a server down after setServerDown() ', ()=> {
    MailServersManager.setServerDown('sendgrid');
    expect(MailServersManager.hasMailServer('sendgrid')).to.eql('down');
  });


  it('should set a server active after setServerActive() ', ()=> {
    MailServersManager.setServerActive('sendgrid');
    expect(MailServersManager.hasMailServer('sendgrid')).to.eql('active');
  });


  it('should return "null" if both servers are down when calling isMailServiceOn()', ()=> {
    MailServersManager.setServerDown('sendgrid');
    MailServersManager.setServerDown('mailgun');
    expect(MailServersManager.isMailServiceOn()).to.eql('null');
  });


  it('should return "sendgrid" after set "sendgrid" active', ()=> {
    MailServersManager.setServerActive('sendgrid');
    expect(MailServersManager.isMailServiceOn()).to.eql('sendgrid');
  });
});
