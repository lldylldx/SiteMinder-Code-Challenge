'use strict';

/**
 * Dependencies
 */
const
  expect = require('chai').expect,
  splitNameEmail = require('../../../../server/lib/helpers/split-name-email');

/**
 * Tests
 */
describe('splitNameEmail', function() {
  it('should not split strings without < symbol', function() {
    const [name, email] = splitNameEmail('lldylldx@gmail.com');
    expect(name).to.equal('');
    expect(email).to.equal('lldylldx@gmail.com');
  });
  it('should split strings with < symbol', function() {
    const [name, email] = splitNameEmail('Peter Tan <lldylldx@gmail.com>');
    expect(name).to.equal('Peter Tan');
    expect(email).to.equal('lldylldx@gmail.com');
  });
});
