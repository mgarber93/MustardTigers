const User = require('./user');
const {Sequelize, db} = require('../connection');

const ClanModel = db.define('clan', {
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true
  },
  tag: {
    type: Sequelize.STRING(8),
    allowNull: true,
  },
  avatar: {
    type: Sequelize.STRING(144),
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING(144),
    allowNull: true,
  },
});

var Clan = {model: ClanModel};

Clan.findAll = function(query = {}) {
  return ClanModel.findAll({where: query});
};

const MAX_CLANS_PER_USER = 5;

/**
 * Clan crud methods.
 */
Clan.create = function({name, creatorId, tag, avatar, description}) {
  return ClanModel.find({where: {name}})
    .then(function(clan) {
      if (clan) {
        throw new Error('Clan already exists');
      }
      return ClanModel.findAll({where: {creatorId}});
    })
    .then(clans => {
      if (clans.length + 1 > MAX_CLANS_PER_USER) {
        throw new Error(`A user can only have ${MAX_CLANS_PER_USER} clans!`);
      }
      return ClanModel.create({name, creatorId, tag, avatar, description});
    });
};

Clan.read = Clan.find = function(query) {
  return ClanModel.findOne({where: query});
};

Clan.update = function(query, values) {
  return ClanModel.update(values, {where: query});
};

Clan.delete = function(query) {
  return ClanModel.destroy({where: query});
};

module.exports = Clan;