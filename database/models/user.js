const {Sequelize, db} = require('../connection');

const User = db.define('users', {
  username: {
  },
  password: {
  },
  salt: {
  }
});

User.sync();

module.exports = User;