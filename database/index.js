const User = require('./models/user');
const Clan = require('./models/clan');
const Forum = require('./models/forum');
const Post = require('./models/post');
const Member = require('./models/member');
const PostVote = require('./models/postVote');
const {db} = require('./connection');


Clan.model.belongsTo(User.model, {constraints: true, as: 'creator'});
Clan.model.hasOne(Forum.model, {constraints: true});

Clan.model.belongsToMany(User.model, {constraints: true, through: Member.model});
User.model.belongsToMany(Clan.model, {constraints: true, through: Member.model});

Forum.model.hasOne(Post.model, {constraints: true});
User.model.hasOne(Post.model, {constraints: true});

Post.model.belongsToMany(User.model, {constraints: true, through: PostVote.model});
User.model.belongsToMany(Post.model, {constraints: true, through: PostVote.model});


module.exports = {
  User,
  Clan,
  Forum,
  Post,
  Member,
  PostVote
};
