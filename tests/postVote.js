const {User, Clan, Forum, Post, PostVote} = require('../database');
const {expect} = require('chai');
const {Sequelize, db} = require('../database/connection');

var user = {username: 'fred_zirdung', password: 'fred_zirdung'};
var user2 = {username: 'test_user_please_ignore', password: 'test_user_please_ignore'};
var clan = {name: 'test_clan_please_ignore', userId: 0};
var forum = {name: 'test_forum_please_ignore', clanId: 0};
var post = {
  userId: 0, 
  forumId: 0,
  title: 'test_post_please_ignore', 
  body: 'test_body_please_ignore',
};

describe('PostVote Schema', function() {
  beforeEach(function(done) {
    db.clearDb()
      .then(() => { done(); })
      .catch(err => {
        console.error(err);
        done(err);
      });
  });

  it('users can upvote on Posts', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.id;
        post.userId = newUser.id;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        clan.id = newClan.id;
        forum.clanId = newClan.id;
        return Forum.create(forum);
      })
      .then(newForum => {
        post.forumId = newForum.forumId;
        return Post.create(post);
      })
      .then(function(newPost) {
        post.id = newPost.id;
        expect(newPost).to.exist;
        expect(newPost.title).to.equal(post.title);
        expect(newPost.body).to.equal(post.body);
        expect(newPost.userId).to.equal(post.userId);
        expect(newPost.forumId).to.equal(post.forumId);
        return PostVote.create(
          {
            userId: clan.userId, 
            postId: newPost.id, 
            upvote: true
          }
        );
      })
      .then(newVote => {
        return PostVote.count({postId: post.id});
      })
      .then(votes => {
        expect(votes[0]).to.equal(1);
        expect(votes[1]).to.equal(0);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });
  
  it('users cant upvote on Posts more than once', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.id;
        post.userId = newUser.id;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        clan.id = newClan.id;
        forum.clanId = newClan.id;
        return Forum.create(forum);
      })
      .then(newForum => {
        post.forumId = newForum.forumId;
        return Post.create(post);
      })
      .then(function(newPost) {
        post.id = newPost.id;
        return PostVote.create(
          {
            userId: clan.userId, 
            postId: newPost.id, 
            upvote: true
          }
        );
      })
      .then(function(newPost) {
        return PostVote.create(
          {
            userId: clan.userId, 
            postId: post.id, 
            upvote: true
          }
        );
      })
      .then(newVote => {
        return PostVote.count({postId: post.id});
      })
      .then(votes => {
        expect(votes[0]).to.equal(1);
        expect(votes[1]).to.equal(0);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it('users can downboat Posts they have upboated', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.id;
        post.userId = newUser.id;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        clan.id = newClan.id;
        forum.clanId = newClan.id;
        return Forum.create(forum);
      })
      .then(newForum => {
        post.forumId = newForum.forumId;
        return Post.create(post);
      })
      .then(function(newPost) {
        post.id = newPost.id;
        return PostVote.create(
          {
            userId: clan.userId, 
            postId: newPost.id, 
            upvote: true
          }
        );
      })
      .then(function(newPost) {
        return PostVote.create(
          {
            userId: clan.userId, 
            postId: post.id, 
            downvote: true 
          }
        );
      })
      .then(newVote => {
        return PostVote.count({postId: post.id});
      })
      .then(votes => {
        expect(votes[0]).to.equal(0);
        expect(votes[1]).to.equal(1);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

});