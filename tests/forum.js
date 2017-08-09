const {Clan, Forum, User} = require('../database');
const {expect} = require('chai');
const {Sequelize, db} = require('../database/connection');

var user = {username: 'fred_zirdung', password: 'fred_zirdung'};
var clan = {name: 'test_clan_please_ignore', userId: 0};
var forum = {name: 'test_forum_please_ignore', clanId: 0};

describe('Forum Schema', function() {
  beforeEach(function(done) {
    db.clearDb()
      .then(() => { done(); })
      .catch(err => {
        console.error(err);
        done(err);
      });
  });

  it('inserts new Forums', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.userId;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        forum.userId = newClan.userId;
        Forum.create(forum)
          .then(function(newForum) {
            expect(newForum).to.exist;
            expect(newForum.name).to.equal(forum.name);
            expect(newForum.clanId).to.equal(forum.userId);
            done();
          }).catch(done);
      });
  });

});
