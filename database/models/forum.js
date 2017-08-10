const clan = require('./clan');
const {Sequelize, db} = require('../connection');

const ForumModel = db.define('forum', {
  name: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true
  },
});

clan.model.hasOne(ForumModel, {constraints: false});

ForumModel.sync();

const Forum = {model: ForumModel};

Forum.findAll = function() {
  return ForumModel.findAll();
};

/**
 * Forum crud methods.
 */
Forum.create = function({name}) {
  return Forum.model.find({where: {name}})
    .then(function(clan) {
      if (clan) {
        throw new Error('Clan already exists');
      }

      // @todo
      return ForumModel.create({name});
    });
};

Forum.read = function(query) {
  return ForumModel.find({where: query});
};

Forum.update = function(query, values) {
  return ForumModel.update({values: values}, {where: query});
};

Forum.delete = function(query) {
  return ForumModel.destroy({where: query});
};

module.exports = Forum;