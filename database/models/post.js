const Forum = require('./forum');
const User = require('./user');
const {Sequelize, db} = require('../connection');

const PostModel = db.define('post', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  upvotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  downvotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  pinned: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Forum.model.hasOne(PostModel, {constraints: false});
User.model.hasOne(PostModel, {constraints: false });

PostModel.sync();

const Post = {model: PostModel};

Post.findAll = function() {
  return PostModel.findAll();
};

/**
 * Post crud methods.
 */
Post.create = ({title, body, upvotes, downvotes, pinned, userId, forumId}) => {
  if (!title) {
    throw new Error('Title must exist!', title);
  }
  if (!body) {
    throw new Error('body must exist!', body);
  }
  return PostModel.create({title, body, upvotes, downvotes, pinned, userId, forumId});
};

Post.read = function(query) {
  return PostModel.find({where: query});
};

Post.update = function(query, values) {
  return PostModel.update({values: values}, {where: query});
};

Post.delete = function(query) {
  return PostModel.destroy({where: query});
};

module.exports = Post;