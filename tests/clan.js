const {Clan, User} = require('../database');
const {expect} = require('chai');
const {Sequelize, db} = require('../database/connection');

var user = {username: 'fred_zirdung', password: 'fred_zirdung'};
var clan = {name: 'test_clan_please_ignore', userId: 0};

describe('Clan Schema', function() {
  beforeEach(function(done) {
    db.clearDb()
      .then(() => { done(); })
      .catch(err => {
        console.error(err);
        done(err);
      });
  });

  it('inserts new clans', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.userId;
        return Clan.create(clan);
      })
      .then(function(newClan) {
        expect(newClan).to.exist;
        expect(newClan.name).to.equal(clan.name);
        expect(newClan.userId).to.equal(clan.userId);
        done();
      }).catch(done);
  });

  it('does not allow duplicate clans', function(done) {
    User.create(user)
      .then(function(newUser) {
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(newClan => {
        return Clan.create(clan);
      })
      .catch(function(error) {
        expect(error.message).to.equal('Clan already exists');
        done();
      });
  });

  it ('returns clan data on read', function(done) {
    User.create(user)
      .then(function(newUser) {
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(({id}) => {
        return Clan.read({id});
      })
      .then(function(newClan) {
        expect(newClan.id).to.exist;
        expect(newClan.name).to.exist;
        done();
      })
      .catch(done);
  });

});
