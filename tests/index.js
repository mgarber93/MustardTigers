const expect = require('chai').expect;
require('./server/ExpressSpec');

describe('basic test', function() {
  it('passes a basic test', function() {
    expect(1).to.equal(1);
  })
});
