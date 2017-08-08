/**
 * @todo Switch from sha256 to bcrypt
 */

const crypto = require('crypto');
const {Sequelize, db} = require('../connection');

const hashData = function(data, salt = '') {
  var shasum = crypto.createHash('sha256');
  shasum.update(data + salt);
  return shasum.digest('hex');
};

const UserModel = db.define('users', {
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
  }
}, {
  hooks: {
    beforeCreate: function(user) {
      user.salt = crypto.randomBytes(32).toString('hex');

      user.password = hashData(user.password, user.salt);
    }
  }
});

UserModel.sync();

var User = {model: UserModel};

User.create = function({username, password}) {
  return UserModel.find({where: {username}})
    .then(function(user) {
      if (user) {
        throw new Error('User already exists');
      }

      return UserModel.create({username, password});
    });
};

User.validate = function({username, password}) {
  return UserModel.findOne({where: {username}})
    .then(function(user) {
      if (user) {
        return user.password === hashData(password, user.salt);
      } else {
        return false;
      }
    });
};

module.exports = User;