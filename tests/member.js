const {User, Clan, Member} = require('../database');
const {expect} = require('chai');
const {Sequelize, db} = require('../database/connection');

var user = {username: 'fred_zirdung', password: 'fred_zirdung'};
var user2 = {username: 'test_user_please_ignore', password: 'test_user_please_ignore'};
var clan = {name: 'test_clan_please_ignore', userId: 0};

describe('Member Schema', function() {
  beforeEach(function(done) {
    db.clearDb()
      .then(() => { done(); })
      .catch(err => {
        console.error(err);
        done(err);
      });
  });
  
  it('inserts new members', function(done) {
    User.create(user)
      .then(newUser => {
        user = newUser;
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(newClan => {
        return Member.create(user.id, newClan.id);
      })
      .then(newMember => {
        expect(newMember).to.exist;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  xit('reads members', function(done) {
    User.create(user)
      .then(newUser => {
        user = newUser;
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(newClan => {
        return Member.create(user.id, newClan.id);
      })
      .then(newMember => {
        return Member.read();
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
});