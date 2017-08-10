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

const UserModel = db.define('user', {
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

/**
 * User _sanitize is a private helper function that sanitizes the output
 * of the model's CRUD functions. For user table a whitelist strategy is
 * used to filter out password<hash> and salt<hash> data.
 * 
 * @param <object> - A rowData object
 */
User._sanitize = function({id, username, createdAt, updatedAt}) {
  return {id, username, createdAt, updatedAt};
};

User.create = function({username, password}) {
  return UserModel.find({where: {username}})
    .then(function(user) {
      if (user) {
        throw new Error('User already exists');
      }

      return UserModel.create({username, password})
        .then(newUser => {
          newUser = User._sanitize(newUser);
          return Promise.resolve(newUser);
        });
    });
};

User.validate = function({username, password}) {
  return UserModel.findOne({where: {username}})
    .then(function(user) {
      if (user && user.password === hashData(password, user.salt)) {
        return User._sanitize(user);
      } else {
        return null;
      }
    });
};

User.findAll = function() {
  return UserModel.findAll().map(User._sanitize);
};

User.read = function({id, username}) {
  return UserModel.find({where: {id}})
    .then(newUser => Promise.resolve(User._sanitize(newUser)));
};

/**
 * No test coverage!
 * @todo testing
 */
User.update = function(query, values) {
  return UserModel.update({values: values}, {where: query})
    .then(doc => Promise.resolve(doc.map(User._sanitize)));
};

User.delete = function(query) {
  return UserModel.destroy({where: query})
    .then(doc => Promise.resolve(User._sanitize(doc)));
};

module.exports = User;