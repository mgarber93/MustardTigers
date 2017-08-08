let request = require('supertest');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const { app } = require('../server/server');

const port = process.env.port || 8080;

app.listen(port, function() {
  console.log(`Listening on ${port}`);
});


/**
 * @todo Double check with the database that changes went through.
 */
describe('', function() {
  var newUser;
  // const db = new Sequelize(process.env.DATABASE_URL, { logging: false });
  // var server;
  // const tablenames = ['users'];

  /**
   * When we query the database use this function to reset it back to a known
   * state before each test.
   * @param  {object}   connection [description]
   * @param  {array}    tablenames [description]
   * @param  {function} done       [description]
   */
  var clearDB = function(connection, tablenames, done) {
    var count = 0;
    tablenames.forEach(function(tablename) {
      connection.query('DROP TABLE IF EXISTS ' + tablename, function() {
        count++;
        if (count === tablenames.length) {
          return schema(db).then(done);
        }
      });
    });
  };

  beforeEach(function(done) {


    // clearDB(db, tablenames, function() {
    //   done();
    // });

    done();

  });

  describe('Express Middleware', function() {

    it('should have index.html', function(done) {
      request(app).get('/')
        .expect(200)
        .expect('Content-Type', /html/, done);
    });

    it('should have users', function(done) {
      request(app).get('/users')
        .expect(200, done);
    });

    it('should return users from get to /users/:user', function(done) {
      request(app).get('/users/1')
        .expect(200)
        .expect('Content-Type', /json/, done);
    });

    it('should create a new user with post to /users ', function(done) {
      request(app).post('/users')
        .send({username: 'foo', password: 'bar'})
        .set('Content-Type', 'application/json')
        .expect(/[0-9]/, done);
    });

    it('should delete a new user with delete to /users ', function(done) {
      request(app).delete('/users/0')
        .expect(/[0-9]/, done);
    });

  });
});
