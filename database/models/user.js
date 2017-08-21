/**
 * @todo Switch from sha256 to bcrypt
 */

const crypto = require('crypto');
const {Sequelize, db} = require('../connection');
const Clan = require('./clan');
const Post = require('./post');

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

UserModel.prototype.toJSON = function() {
  var values = this.dataValues;

  delete values.password;
  delete values.salt;

  return values;
};

var User = {model: UserModel};

const privateData = ['password', 'salt'];

const joinArray = [
  {
    model: Clan.model,
    association: 'memberships',
  },
  {
    model: Post.model,
    association: 'posts',
  },
];

User.create = function({username, password}) {
  return UserModel.findOrCreate({
    where: {username},
    defaults: {password}
  })
    .spread(function(user, created) {
      if (!created) {
        throw new Error('User already exists');
      }

      return user.reload({
        include: joinArray
      });
    })
    .then(user => user.toJSON());
};

User.validate = function({username, password}) {
  return UserModel.findOne({where: {username}})
    .then(function(user) {
      if (user && user.password === hashData(password, user.salt)) {
        return user.reload({
          include: joinArray
        })
          .then(user => user.toJSON());
      } else {
        return null;
      }
    });
};

User.findAll = function(query = {}) {
  return UserModel.findAll({
    where: query,
    attributes: {
      exclude: privateData
    }, 
    include: joinArray
  })
    .map(user => user.toJSON());
};

User.read = User.find = function(query = {}) {
  return UserModel.findOne({
    where: query,
    attributes: {
      exclude: privateData
    }, 
    include: joinArray
  })
    .then(user => user && user.toJSON());
};

/**
 * @todo test coverage for update!
 * @todo generate new password hash?
 * Model.update returns an array with the affected row count and the rows affected.
 * It should be decided how that is returned later.
 */
User.update = function(query, values) {
  return UserModel.update({values: values}, {where: query});
};

/**
 * Model.destroy returns the rows affected and does not need to be sanitized.
 */
User.delete = function(query) {
  return UserModel.destroy({where: query});
};

module.exports = User;