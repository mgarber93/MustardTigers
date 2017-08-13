const User = require('./user');
const {Sequelize, db} = require('../connection');

const ClanModel = db.define('clan', {
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true
  },
});

ClanModel.belongsTo(User.model, {constraints: true});

ClanModel.sync();

var Clan = {model: ClanModel};

Clan.findAll = function(query = {}) {
  return ClanModel.findAll({where: query});
};

/**
 * Clan crud methods.
 */
Clan.create = function({name, userId}) {
  return ClanModel.find({where: {name}})
    .then(function(clan) {
      if (clan) {
        throw new Error('Clan already exists');
      }
      return ClanModel.create({name, userId});
    });
};

Clan.read = Clan.find = function(query) {
  return ClanModel.findOne({where: query});
};

Clan.update = function(query, values) {
  return ClanModel.update({values}, {where: query});
};

Clan.delete = function(query) {
  return ClanModel.destroy({where: query});
};

module.exports = Clan;