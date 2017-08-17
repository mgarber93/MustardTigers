const {User, Clan, Member} = require('../database');
const {expect} = require('chai');
const {db} = require('../database/connection');

var user = {username: 'fred_zirdung', password: 'fred_zirdung'};
var user2 = {username: 'test_user_please_ignore', password: 'test_user_please_ignore'};
var clan = {name: 'test_clan_please_ignore', userId: 0};

describe('Member Schema', function() {
  beforeEach(function() {
    return db.sync({force: true});
  });
  
  it('inserts new members', function() {
    return User.create(user)
      .then(newUser => {
        user.id = newUser.id;
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(newClan => {
        return Member.create(user.id, newClan.id);
      })
      .then(newMember => {
        expect(newMember).to.exist;
      });
  });

  it('reads a member', function() {
    return User.create(user)
      .then(newUser => {
        user.id = newUser.id;
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(newClan => {
        clan.id = newClan.id;
        return Member.create(user.id, newClan.id);
      })
      .then(newMember => {
        return Member.read({id: newMember.id});
      })
      .then(readMember => {
        expect(readMember).to.exist;
        expect(readMember.userId).to.equal(user.id);
        expect(readMember.clanId).to.equal(clan.id);
      });
  });

  it('reads members', function() {
    return User.create(user)
      .then(newUser => {
        user.id = newUser.id;
        return User.create(user2);
      })
      .then(newUser => {
        user2 = newUser;
        clan.userId = newUser.id;
        return Clan.create(clan);
      })
      .then(newClan => {
        clan.id = newClan.id;
        return Member.create(user.id, newClan.id);
      })
      .then(() => {
        return Member.create(user2.id, clan.id);
      })
      .then(newMember => {
        return Member.readAll();
      })
      .then(readMember => {
        expect(readMember).to.exist;
        expect(Array.isArray(readMember)).to.equal(true);
        expect(readMember[0].userId).to.equal(user.id);
        expect(readMember[1].userId).to.equal(user2.id);
        expect(readMember[0].clanId).to.equal(clan.id);
        expect(readMember[1].clanId).to.equal(clan.id);
      });
  });
});
