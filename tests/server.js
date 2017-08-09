const supertest = require('supertest');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const { app } = require('../server/server');
const request = supertest.agent(app);

app.listen(process.env.port || 8080, function() {
  console.log(`Listening on ${process.env.port || 8080}`);
});



/**
 * @todo Double check with the database that changes went through.
 */
describe('', function() {
  var newUser;
  // Save for later
  // const db = new Sequelize(process.env.DATABASE_URL, { logging: false });
  // var server;
  // const tablenames = ['users'];

  beforeEach(function(done) {
    // clearDB(db, tablenames, function() {
    //   done();
    // });
    done();
  });

  describe('Express Middleware', function() {

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
      request.get('/users/1')
        .expect(200)
        .expect('Content-Type', /json/, done);
    });

    it('should create a new user with post to /users ', function(done) {
      request.post('/users')
        .send({username: 'foo', password: 'bar'})
        .set('Content-Type', 'application/json')
        .expect(/[0-9]/, done);
    });

    it('should delete a new user with delete to /users ', function(done) {
      request.delete('/users/0')
        .expect(/[0-9]/, done);
    });

  });
});
