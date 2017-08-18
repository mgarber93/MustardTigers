const {Clan, User} = require('../database');
const {expect} = require('chai');
const {db} = require('../database/connection');

var user = {username: 'fred_zirdung', password: 'fred_zirdung'};
var clan = {name: 'test_clan_please_ignore', userId: 0};

describe('Clan Schema', function() {
  beforeEach(function() {
    return db.sync({force: true});
  });

  it('inserts new clans', function() {
    return User.create(user)
      .then(newUser => {
        clan.userId = newUser.userId;
        return Clan.create(clan);
      })
      .then(function(newClan) {
        expect(newClan).to.exist;
        expect(newClan.name).to.equal(clan.name);
        expect(newClan.userId).to.equal(clan.userId);
      });
  });

  it('does not allow duplicate clans', function() {
    return User.create(user)
      .then(function(newUser) {
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(newClan => {
        return Clan.create(clan);
      })
      .catch(function(error) {
        expect(error.message).to.equal('Clan already exists');
      });
  });

  it ('returns clan data on read', function() {
    return User.create(user)
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
      });
  });

  it ('updates clan data', function() {
    return User.create(user)
      .then(function(newUser) {
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(({id}) => {
        clan.id = id;
        return Clan.update({id}, {name: 'TEST'});
      })
      .then(() => {
        return Clan.read(clan.id);
      })
      .then(function(newClan) {
        expect(newClan.id).to.exist;
        expect(newClan.name).to.equal('TEST');
      });
  });

  it ('deletes clan data', function() {
    return User.create(user)
      .then(function(newUser) {
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(({id}) => {
        clan.id = id;
        return Clan.delete({id});
      })
      .then(() => {
        return Clan.read(clan.id);
      })
      .then(function(newClan) {
        expect(newClan).to.equal(null);
      });
  });
});
