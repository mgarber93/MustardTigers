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


Clan.model.belongsToMany(User.model, {constraints: true, through: MemberModel});
User.model.belongsToMany(Clan.model, {constraints: true, through: MemberModel});

MemberModel.sync();

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

Member.read = Member.find = function({id}) {
  return Member.model.findOne({id});
};

Member.findAll = Member.readAll = function(query = {}) {
  return Member.model.findAll({where: query});
};

Member.confirm = function({id, userId}) {
  return Member.model.update({confirmed: true}, {id, userId});
};

module.exports = Member;