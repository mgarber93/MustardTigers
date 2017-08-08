const crypto = require('crypto');
const {Sequelize, db} = require('../connection');

const User = db.define('users', {
  username: {
    type: Sequelize.STRING(40),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(64),
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING(64),
    allowNull: false
  }
});

User.sync();

module.exports = User;