const {Clan} = require('../database');
const {expect} = require('chai');
const {Sequelize, db} = require('../database/connection');

var clan = {name: 'test_clan_please_ignore', userId: 0};

describe('Clan Schema', function() {
  beforeEach(function(done) {
    db.transaction((t) => {
      const options = { raw: true, transaction: t };
      return Promise.resolve(db)
        .then(function() {
          return db.query('delete from users', null, options);
        })
        .then(function() {
          return db.query('delete from clans', null, options);
        });
    })
      .then(() => { done(); })
      .catch(err => {
        console.error(err);
        done(err);
      });
  });

  it('inserts new users', function(done) {
    Clan.model.create(clan)
      .then(function(newUser) {
        expect(newUser).to.exist;
        expect(newUser.name).to.equal(clan.name);
        expect(newUser.userId).to.equal(clan.userId);
        done();
      }).catch(done);
  });

});
