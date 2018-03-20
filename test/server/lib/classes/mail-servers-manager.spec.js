'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  mailServersManager = require('../../../../server/lib/classes/mail-servers-manager');

/**
 * Tests
 */
describe('addNewServer()',  () => {

  const
    serv01 = ['google','down'],
    serv02 = ['facebook', 'live'];

  it('should return true with parameters ["google","down"]', ()=> {
    expect(mailServersManager.addNewServer(serv01[0], serv01[1])).to.be.true;
    expect(mailServersManager.hasMailServer(serv01[0])).to.eql("down");
    expect(mailServersManager.hasMailServer('mailgun')).to.eql("active");
    expect(mailServersManager.hasMailServer('mailgun')).to.eql("active");
  });

  it('should return false with parameters ["facebook","live"]', ()=> {
    expect(mailServersManager.addNewServer(serv02[0], serv02[1])).to.be.false;
    expect(mailServersManager.hasMailServer(serv02[0])).to.eql('null');
  });

  it('should return false with remove server "google"', ()=> {
    mailServersManager.removeServer(serv01[0]);
    expect(mailServersManager.hasMailServer(serv01[0])).to.eql('null');
  });
});

describe('getPrimServer(), setPrimServer()', () => {

  it('should return "mailgun" as default server', ()=> {
    expect(mailServersManager.getPrimServer()).to.eql('mailgun');
  });

  it('should return "sendmail" as default server after being set', ()=> {
    mailServersManager.setPrimServer('sendmail');
    expect(mailServersManager.getPrimServer()).to.eql('sendmail');
  });

});

describe('getPrimServDownTime(), addPrimServDownTime(), resetPrimServDownTime()', () => {

  it('should return primary server down time 0 as default', ()=> {
    expect(mailServersManager.getPrimServDownTime()).to.eql(0);
  });


  it('should return primary server down time 1 after addPrimServDownTime()', ()=> {
    mailServersManager.addPrimServDownTime();
    expect(mailServersManager.getPrimServDownTime()).to.eql(1);
  });


  it('should return primary server down time 0 after resetPrimServDownTime()', ()=> {
    mailServersManager.resetPrimServDownTime();
    expect(mailServersManager.getPrimServDownTime()).to.eql(0);
  });
});

describe('setServerActive(), setServerDown(), isMailServiceOn()', () => {

  it('should set a server down after setServerDown() ', ()=> {
    mailServersManager.setServerDown('sendgrid');
    expect(mailServersManager.hasMailServer('sendgrid')).to.eql('down');
  });


  it('should set a server active after setServerActive() ', ()=> {
    mailServersManager.setServerActive('sendgrid');
    expect(mailServersManager.hasMailServer('sendgrid')).to.eql('active');
  });


  it('should return "null" if both servers are down when calling isMailServiceOn()', ()=> {
    mailServersManager.setServerDown('sendgrid');
    mailServersManager.setServerDown('mailgun');
    expect(mailServersManager.isMailServiceOn()).to.eql('null');
  });


  it('should return "sendgrid" after set "sendgrid" active', ()=> {
    mailServersManager.setServerActive('sendgrid');
    expect(mailServersManager.isMailServiceOn()).to.eql('sendgrid');
  });
});
