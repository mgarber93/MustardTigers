const mysql = require('mysql2');
let request = require('supertest');
const bodyParser = require('body-parser');

const { app } = require('../server/server');

const port = process.env.port || 8080;

app.listen(port, function() {
  console.log(`Listening on ${port}`);
});

xdescribe('', function(){
  var db;
  var server;

  request = request(`http://localhost:${port}`);

  /**
   * When we query the database use this function to reset it back to a known
   * state before each test.
   * @param  {object}   connection [description]
   * @param  {array}   tablenames [description]
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
    db = mysql.createConnection({
      // fill this out!
      user: 'TODO',
      password: 'TODO',
      database: 'TODO',
    });

    // var tablenames = ['users'];

    // db.connect(function(err) {
    //   if(err) { return done(err); }
    //   clearDB(db, tablenames, function() {
    //     server = app.listen(port, done);
    //   });
    // });
    done();
    // afterEach(function() { server.close(); });
  })

  describe('Express Middleware', function(){

    it('should have index.html', function(done) {
        request.get('/')
        .expect(200, done);
    });

    it('should have users', function(done) {
      request.get('/users')
        .expect(200, done);
    });

  });
});
