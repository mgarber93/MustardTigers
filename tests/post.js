const {Clan, Forum, Post, User} = require('../database');
const {expect} = require('chai');
const {Sequelize, db} = require('../database/connection');

var user = {username: 'fred_zirdung', password: 'fred_zirdung'};
var clan = {name: 'test_clan_please_ignore', userId: 0};
var forum = {name: 'test_forum_please_ignore', clanId: 0};
var post = {
  userId: 0, 
  forumId: 0,
  title: 'test_post_please_ignore', 
  body: 'test_body_please_ignore',
};

describe('Post Schema', function() {
  beforeEach(function(done) {
    db.clearDb()
      .then(() => { done(); })
      .catch(err => {
        console.error(err);
        done(err);
      });
  });

  it('inserts new Posts', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.id;
        post.userId = newUser.id;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        forum.clanId = newClan.id;
        return Forum.create(forum);
      })
      .then(newForum => {
        post.forumId = newForum.forumId;
        return Post.create(post);
      })
      .then(function(newPost) {
        expect(newPost).to.exist;
        expect(newPost.title).to.equal(post.title);
        expect(newPost.body).to.equal(post.body);
        expect(newPost.userId).to.equal(post.userId);
        expect(newPost.forumId).to.equal(post.forumId);
        done();
      }).catch(done);
  });

});
