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

const UNSANITARY_DATA = ['password', 'salt'];
/**
 * Sanitize is a private helper function that sanitizes the output
 * of the model's CRUD functions. For user's table a blacklist strategy is
 * used to filter out password<hash> and salt<hash> data.
 * 
 * @param <object> - A rowData object
 */
const sanitize = function(obj) {
  for (const unsanitary of UNSANITARY_DATA) {
    obj[unsanitary] = undefined;
    delete obj[unsanitary];
  }
  return obj;
};

User.create = function({username, password}) {
  return UserModel.find({where: {username}})
    .then(function(user) {
      if (user) { throw new Error('User already exists'); }
      return UserModel.create({username, password});
    })
    .then(sanitize);
};

User.validate = function({username, password}) {
  return UserModel.findOne({where: {username}})
    .then(function(user) {
      if (user && user.password === hashData(password, user.salt)) {
        return sanitize(user);
      } else {
        return null;
      }
    });
};

User.read = User.find = function(query) {
  return UserModel.findOne(
    {attributes: {exclude: UNSANITARY_DATA}, where: query}
  );
};

User.findAll = function(query = {}) {
  return UserModel.findAll(
    {attributes: {exclude: UNSANITARY_DATA}, where: query}
  );
};


/**
 * @todo test coverage for update!
 */
User.update = function(query, values) {
  return UserModel.update({values: values}, {where: query})
    .then(doc.map(sanitize));
};

User.delete = function(query) {
  return UserModel.destroy({where: query})
    .then(sanitize);
};

module.exports = User;