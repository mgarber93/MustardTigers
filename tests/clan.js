const {Clan} = require('../database');
const {expect} = require('chai');
const {Sequelize, db} = require('../database/connection');

var user = {name: 'test_clan_please_ignore'};

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
    Clan.model.create(user)
      .then(function(newUser) {
        expect(newUser.username).to.exist;
        expect(newUser.salt).to.exist;
        expect(newUser.password).to.not.equal(user.password);

        done();
      }).catch(done);
  });

});
