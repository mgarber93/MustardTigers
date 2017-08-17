const {expect} = require('chai');
const {app} = require('../server/server');
const request = require('supertest').agent(app);
const {db} = require('../database/connection');

// @todo this should probably go in a helper library
var clearDb = function(done) {
  db.clearDb().then(() => done()).catch(done);
};

var testClan = {name: 'test_clan_please_ignore'};

describe('Clans API Endpoint', function() {
  beforeEach(clearDb);

  it('should retrieve an array', function(done) {
    request.get('/api/clans')
      .expect(res => {
        expect(res.body.results).to.exist;
        expect(res.body.results).to.be.an('array');
      })
      .expect(200, done);
  });

  it('should insert new clans', function(done) {
    request.post('/api/clans')
      .send(testClan)
      .expect(res => {
        expect(res.body.name).to.equal(testClan.name);
      })
      .expect(201, done);
  });

  it('should retrieve existing clans', function(done) {
    var newClan;

    request.post('/api/clans')
      .send(testClan)
      .expect(201)
      .then(res => {
        newClan = res.body;

        return request.get('/api/clans')
          .expect(res => {
            expect(res.body.results.length).to.equal(1);
            expect(res.body.results[0].id).to.equal(newClan.id);
            expect(res.body.results[0].name).to.equal(newClan.name);
          })
          .expect(200);
      })
      .then(() => {
        request.get(`/api/clans/${newClan.id}`)
          .expect(res => {
            expect(res.body.results).to.exist;
            expect(res.body.results.id).to.equal(newClan.id);
            expect(res.body.results.name).to.equal(newClan.name);
          })
          .expect(200, done);
      })
      .catch(done);
  });

  it('should retrieve existing clans with a query', function(done) {
    request.post('/api/clans')
      .send(testClan)
      .expect(201)
      .then(res => {
        newClan = res.body;

        return request.get('/api/clans')
          .query({name: testClan.name})
          .expect(res => {
            expect(res.body.results.length).to.equal(1);
            expect(res.body.results[0].id).to.equal(newClan.id);
            expect(res.body.results[0].name).to.equal(newClan.name);
          })
          .expect(200);
      })
      .then(() => {
        request.get('/api/clans')
          .query({name: 'Barbara Streisand'})
          .expect(res => {
            expect(res.body.results.length).to.equal(0);
          })
          .expect(200, done);
      })
      .catch(done);
  });
});
