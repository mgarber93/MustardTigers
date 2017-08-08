const express = require('express');
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser'); 
const User = require('../database/models/user');

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Static routes
 */
app.use(express.static(__dirname + '/../client/build'));


/**
 * A get request to the users endpoint returns all users as an array of json
 * objects. A post to users creates a new user and returns the new user's id as 
 * the id property of the reponse.
 * 
 * @param  {function} (req, res, next) - Request handler 
 */
app.route('/users')
  .get((req, res, next) => {
    User.findAll() 
      .then(doc => {
        res.status(200);
        res.json({results: Array.isArray(doc) ? doc : [doc]});
        res.end();
      })
      .catch(except => {
        res.status(400);
        res.end(except.message || 'Unable to fetch users!');
      })
      .error(error => {
        res.status(500);
        res.end(error.message || 'Internal error');
      });
  })
  .post((req, res, next) => {
    User.create({
      username: req.body.username, 
      password: req.body.password
    })
      .then(doc => {
        res.status(200);
        res.json({id: doc.id});
        res.end();
      })
      .catch(except => {
        res.status(400);
        res.end(except.message || 'Unable to create user!');
      })
      .error(error => {
        res.status(500);
        res.end(error.message || 'Internal error');
      });
  });


/**
 * Read, update, or delete a specific user by sending a get, post, or delete
 * verb to the user's endpoint. On success, post and delete will return 
 * the changed user's id.
 * 
 * @param  {function} (req, res, next) - Request handler 
 */
app.route('/users/:user')
  .get((req, res, next) => {
    User.find({id: req.params.user}) 
      .then(doc => {
        res.status(200);
        res.json({results: Array.isArray(doc) ? doc : [doc]});
        res.end();
      })
      .catch(except => {
        res.status(400);
        res.end(except.message || 'Unable to fetch users!');
      })
      .error(error => {
        res.status(500);
        res.end(error.message || 'Internal error');
      });
  })
  .post((req, res, next) => {
    User.update({id: req.body.id}, {
      username: req.body.username,
      password: req.body.password,
    })
      .then(doc => {
        res.status(200);
        res.json({id: doc.id});
        res.end();
      })
      .catch(except => {
        res.status(except.status || 400);
        res.end(except.message || 'Unable to update user!');
      })
      .error(error => {
        res.status(500);
        res.end(error.message || 'Internal error');
      });
  })
  .delete((req, res, next) => {
    User.delete({id: req.params.user})
      .then(doc => {
        res.status(200);
        res.json({id: req.params.user});
        res.end();
      })
      .catch(except => {
        res.status(except.status || 400);
        res.end(except.message || 'Unable to delete users!');
      })
      .error(error => {
        res.status(500);
        res.end(error.message || 'Internal error');
      });
  });


module.exports.app = app;