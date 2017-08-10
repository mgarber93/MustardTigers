const User = require('./user');
const Clan = require('./clan');
const {Sequelize, db} = require('../connection');

/**
 * Set up join table,
 * For now let default role be rank 1000, lower ranks take priority.
 */
const MemberModel = db.define('member', {
  // role: {
  //   type: Sequelize.ENUM,
  //   values: ['admin', 'moderator', 'member'],
  //   defaultValue: 'member' 
  // }
});


Clan.model.belongsToMany(User.model, {constraints: false, through: MemberModel});
User.model.belongsToMany(Clan.model, {constraints: false, through: MemberModel});

MemberModel.sync();

var Member = {model: MemberModel};

Member.create = Member.joinUserToClan = function(userId, clanId) {
  return User.find({id: userId})
    .then(user => {
      if (!user) {
        throw new Error('No such user! ' + userId);
      }
      return Clan.find({id: clanId});
    })
    .then(clan => {
      if (!clan) {
        throw new Error('No such clan! ' + clanId);
      }
      return MemberModel.create({userId, clanId});
    });
};

Member.create = Member.joinUserToClan = function(userId, clanId) {
  return User.find({id: userId})
    .then(user => {
      if (!user) {
        throw new Error('No such user! ' + userId);
      }
      return Clan.find({id: clanId});
    })
    .then(clan => {
      if (!clan) {
        throw new Error('No such clan! ' + clanId);
      }
      return MemberModel.create({userId, clanId});
    });
};

Member.read = function({id}) {
  return Member.model.find({id});
};

module.exports = Member;