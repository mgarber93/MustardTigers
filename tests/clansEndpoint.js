const {expect} = require('chai');
const {app} = require('../server/server');
const request = require('supertest').agent(app);
const {db} = require('../database/connection');

// @todo this should probably go in a helper library
var clearDb = function(done) {
  db.clearDb()
    .then(function() {
      console.log(arguments);
      done();
    }).catch(done);
};

describe('Clans API Endpoint', function() {
  beforeEach(clearDb);

  it('should retrieve an array', function(done) {
    request.get('/clans')
      .expect(res => {
        expect(res.body.results).to.exist;
        expect(res.body.results).to.be.an('array');
      })
      .expect(200, done);
  });
});