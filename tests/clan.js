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

  it('inserts new users', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.userId;
        Clan.model.create(clan)
          .then(function(newClan) {
            expect(newClan).to.exist;
            expect(newClan.name).to.equal(clan.name);
            expect(newClan.userId).to.equal(clan.userId);
            done();
          }).catch(done);
      });
  });

});
