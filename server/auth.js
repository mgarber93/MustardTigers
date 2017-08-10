const router = require('express').Router();
const {User} = require('../database');

router.post('/local', function(req, res) {
  var user = req.body;

  User.validate(user)
    .then(function(validUser) {
      if (validUser) {
        req.session.userId = validUser.id;
        res.json(validUser.username);
      } else {
        res.sendStatus(401);
      }
    });
});

module.exports = router;