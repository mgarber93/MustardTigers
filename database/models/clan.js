const User = require('./user');
const {Sequelize, db} = require('../connection');

const ClanModel = db.define('clan', {
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true
  },
});

ClanModel.belongsTo(User.model, {foreignKey: 'admin', constraints: false});

ClanModel.sync();

var Clan = {model: ClanModel};

Clan.create = function({username, password}) {
  return ClanModel.find({where: {username}})
    .then(function(clan) {
      if (clan) {
        throw new Error('Clan already exists');
      }

      // @todo
      return ClanModel.create({username, password});
    });
};

Clan.findAll = function() {
  return ClanModel.findAll();
};

Clan.read = function(query) {
  return ClanModel.find({where: query});
};

Clan.update = function(query, values) {
  return ClanModel.update({values: values}, {where: query});
};

Clan.delete = function(query) {
  return ClanModel.destroy({where: query});
};

module.exports = Clan;