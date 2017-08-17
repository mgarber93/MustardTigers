const User = require('./user');
const Clan = require('./clan');
const {Sequelize, db} = require('../connection');

/**
 * Set up join table,
 * @todo roles
 */
const MemberModel = db.define('member', {
  confirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

var Member = {model: MemberModel};

Member.create = Member.joinUserToClan = function(userId, clanId, confirmed = false) {
  return User.find({id: userId})
    .then(user => {
      if (!user) { throw new Error('No such user! ' + userId); }
      return Clan.find({id: clanId});
    })
    .then(clan => {
      if (!clan) { throw new Error('No such clan! ' + clanId); }
      return MemberModel.create({userId, clanId, confirmed});
    });
};

Member.read = Member.find = function(query) {
  return Member.model.findOne(query);
};

Member.readAll = Member.findAll = function(query = {}) {
  return Member.model.findAll({where: query});
};

Member.confirm = function({userId, clanId}) {
  return Member.model.update({confirmed: true}, {userId, clanId});
};

Member.delete = function({userId, clanId}) {
  return Member.model.destroy({where: {userId, clanId}});
};

module.exports = Member;