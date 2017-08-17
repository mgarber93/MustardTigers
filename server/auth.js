const router = require('express').Router();
const {User} = require('../database');

router.post('/local', (req, res) => {
  var user = req.body;

  User.validate(user)
    .then(function(validUser) {
      if (validUser) {
        req.session.userId = validUser.id;
        res.json(
          {
            id: validUser.id,
            username: validUser.username
          }
        );
      } else {
        res.sendStatus(401);
      }
    });
});

router.all('/logout', (req, res) => {
  if (req.session.userId) {
    req.session.destroy(() => {
      res.status(201).send('User successfully logged out');
    });
  } else {
    res.status(401).send('User not logged in');
  }
});

module.exports = router;