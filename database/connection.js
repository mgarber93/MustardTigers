const Sequelize = require('sequelize');

const database = process.env.DATABASE_URL;

const db = new Sequelize(database, {
  logging: false,
  force: true
});

db.clearDb = () => {
  return db.transaction((t) => {
    const options = { raw: true, transaction: t };
    return Promise.resolve(db)
      .then(function() {
        return Promise.all([
          db.query('delete from users', null, options),
          db.query('delete from forums', null, options),
          db.query('delete from posts', null, options),
          db.query('delete from members', null, options),
          db.query('delete from clans', null, options),
          db.query('delete from postVotes', null, options),
        ]);
      });
  });
};

module.exports = {
  Sequelize,
  db
};