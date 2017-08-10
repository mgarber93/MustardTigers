const supertest = require('supertest');
const { app } = require('../server/server');
const request = supertest.agent(app);
const { User } = require('../database');
const {Sequelize, db} = require('../database/connection');

/**
 * @todo Double check with the database that changes went through.
 */
describe('', function() {
  describe('Express Middleware', function() {
    
    var user = {username: 'fred_zirdung', password: 'fred_zirdung'};

    beforeEach(function(done) {
      db.clearDb()
        .then(() => { done(); })
        .catch(err => {
          console.error(err);
          done(err);
        });
    });

    it('should have index.html', function(done) {
      request.get('/')
        .expect(200)
        .expect('Content-Type', /html/, done);
    });

    it('should have users', function(done) {
      request.get('/users')
        .expect(200, done);
    });

    it('should return users from get to /users/:user', function(done) {
      User.create(user)
        .then(newUser => {
          request.get(`/users/${newUser.id}`)
            .expect(200)
            .expect('Content-Type', /json/, done);
        });
    });

    it('should create a new user with post to /users ', function(done) {
      request.post('/users')
        .send({username: 'foo', password: 'bar'})
        .set('Content-Type', 'application/json')
        .expect(200, done);
    });

    it('should delete a new user with delete to /users ', function(done) {
      User.create(user)
        .then(newUser => {
          request.delete(`/users/${newUser.id}`)
            .expect(200, done);
        });
    });

  });
});
