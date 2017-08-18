const clan = require('./clan');
const {Sequelize, db} = require('../connection');

const ForumModel = db.define('forum', {
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true
  },
});

const Forum = {model: ForumModel};

Forum.findAll = function(query = {}) {
  return ForumModel.findAll({where: query});
};

/**
 * Forum crud methods.
 */
Forum.create = function({name, clanId}) {
  return Forum.model.find({where: {name}})
    .then(function(clan) {
      if (clan) {
        throw new Error('Clan already exists');
      }
      return Forum.model.create({name, clanId});
    });
};

Forum.read = Forum.find = function(query) {
  return ForumModel.findOne({where: query});
};

Forum.update = function(query, values) {
  return ForumModel.update(values, {where: query});
};

Forum.delete = function(query) {
  return ForumModel.destroy({where: query});
};

module.exports = Forum;