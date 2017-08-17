const {User} = require('../database');
const {expect} = require('chai');
const {db} = require('../database/connection');

var user = {username: 'fred_zirdung', password: 'fred_zirdung'};
var user2 = {username: 'test_user_please_ignore', password: 'test_user_please_ignore'};

describe('User Schema', function() {
  beforeEach(function() {
    return db.sync({force: true});
  });

  it('inserts new users', function() {
    return User.model.create(user)
      .then(function(newUser) {
        expect(newUser.id).to.exist;
        expect(newUser.username).to.exist;
        expect(newUser.salt).to.exist;
        expect(newUser.password).to.not.equal(user.password);
      });
  });

  it('does not allow duplicate users', function() {
    return User.create(user)
      .then(function(newUser) {
        return User.create(user);
      })
      .catch(function(error) {
        expect(error.message).to.equal('User already exists');
      });
  });

  it ('validates existing users', function() {
    return User.create(user)
      .then(function() {
        return User.validate(user);
      })
      .then(function(user) {
        expect(user).to.exist;
      });
  });

  it ('sanitizes user data on create', function() {
    return User.create(user)
      .then(function(newUser) {
        expect(newUser.id).to.exist;
        expect(newUser.username).to.exist;
        expect(newUser.salt).to.not.exist;
        expect(newUser.password).to.not.exist;
      });
  });

  it ('sanitizes user data on read', function() {
    return User.create(user)
      .then(({id}) => {
        return User.read({id});
      })
      .then(function(newUser) {
        expect(newUser.id).to.exist;
        expect(newUser.username).to.exist;
        expect(newUser.salt).to.not.exist;
        expect(newUser.password).to.not.exist;
      });
  });

  it ('sanitizes user data on findAll', function() {
    return User.create(user)
      .then(() => {
        return User.create(user2);
      })
      .then(() => {
        return User.findAll();
      })
      .then(users => {
        users.forEach(user => {
          expect(user.id).to.exist;
          expect(user.username).to.exist;
          expect(user.salt).to.not.exist;
          expect(user.password).to.not.exist;
        });
      });
  });
});
