const {expect} = require('chai');
const {app} = require('../server/server');
const request = require('supertest').agent(app);
const {db} = require('../database/connection');

var clan = {name: 'test_clan_please_ignore'};
var forum = {name: 'test_forum_please_ignore', clanId: 0};
var post = {
  forumId: 0,
  title: 'test_post_please_ignore', 
  body: 'test_body_please_ignore',
};

describe('Forums API Endpoint', function() {
  beforeEach(function() {
    return db.sync({force: true});
  });

  it('should retrieve an array', function() {
    return request.get('/api/clans')
      .expect(200)
      .then(res => {
        expect(res.body.results).to.exist;
        expect(res.body.results).to.be.an('array');
      });
  });

  it('should insert new forum', function() {
    return request.post('/api/clans')
      .send(clan)
      .then(res => {
        forum.clanId = res.body.id;
        return request.post('/api/forums')
          .send(forum);
      })
      .then(res => {
        return request.get(`/api/forums/${res.body.id}`);
      })
      .then(res => {
        expect(res.body.results).to.exist;
        expect(res.body.results).to.be.an('object');
        expect(res.body.results.name).to.equal(forum.name);
        expect(res.body.results.clanId).to.equal(forum.clanId);
      });
  });

  it('should retrieve existing forums with a query', function() {
    return request.post('/api/clans')
      .send(clan)
      .then(res => {
        forum.clanId = res.body.id;
        return request.post('/api/forums')
          .send(forum);
      })
      .then(res => {
        var name = res.body.name;
        return request.get('/api/forums')
          .query({name});
      })
      .then(res => {
        expect(res.body.results.length).to.equal(1);
        expect(res.body.results[0].clanId).to.equal(forum.clanId);
        expect(res.body.results[0].name).to.equal(forum.name);
      })
      .then(() => {
        return request.get('/api/forums')
          .query({name: 'Barbara_Streisand'});
      })
      .then(res => {
        expect(res.body.results.length).to.equal(0);
      });
  });
  
  it('should update existing clans', function() {
    var id;
    return request.post('/api/clans')
      .send(clan)
      .then(res => {
        forum.clanId = res.body.id;
        return request.post('/api/forums/1')
          .send({name: 'Fred\'s Club'})
          .expect(400);
      })
      .then(() => {
        return request.post('/api/forums/')
          .send(forum);
      })
      .then(res => {
        id = res.body.id;
        return request.post(`/api/forums/${id}`)
          .send({name: 'Fred\'s Club'})
          .expect(202);
      })
      .then(res => {
        return request.get(`/api/forums/${id}`)
          .expect(200);
      })
      .then(res => {
        expect(res.body.results.name).to.equal('Fred\'s Club');
      });
  });

  it('should delete existing forums', function() {
    var id;
    return request.post('/api/clans')
      .send(clan)
      .then(res => {
        forum.clanId = res.body.id;
        return request.post('/api/forums/')
          .send(forum);
      })
      .then(res => {
        id = res.body.id;
        return request.get(`/api/forums/${id}`);
      })
      .then(res => {
        expect(res.body.results.name).to.equal(forum.name);
      })
      .then(() => {
        return request.delete(`/api/forums/${id}`)
          .expect(202);
      })
      .then(() => {
        return request.get(`/api/forums/${id}`);
      })
      .then(res => {
        expect(res.body.results).to.equal(undefined);
      });
  });

  it('should create posts', function() {
    return request.post('/api/clans')
      .send(clan)
      .then(res => {
        forum.clanId = res.body.id;
        return request.post('/api/forums/')
          .send(forum);
      })
      .then(res => {
        post.forumId = res.body.id;
        return request.post(`/api/forums/${post.forumId}/posts`)
          .send(post);
      })
      .then(res => {
        post.id = res.body.id;
        return request.get(`/api/forums/${post.forumId}/posts/${post.id}`);
      })
      .then(res => {
        expect(res.body.body).to.equal(post.body); 
        expect(res.body.title).to.equal(post.title); 
      });
  });
});
