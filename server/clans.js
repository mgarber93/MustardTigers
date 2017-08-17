const router = require('express').Router();
const {Clan, User} = require('../database');

router.get('/', (req, res) => {
  return Clan.findAll(req.query)
    .then(clans => {
      res.json({results: clans});
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.get('/:clan', (req, res) => {
  return Clan.read({id: req.params.clan})
    .then(clan => {
      if (clan) {
        res.json({results: clan.toJSON()});
      } else {
        res.status(400).send('Clan doesn\'t exist');
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.get('/:clan/members', (req, res) => {
  Clan.model.findOne({
    include: [{
      model: User.model,
    }],
    where: {id: req.params.clan}
  })
    .then((clan) => {
      if (clan) {
        res.json({results: clan.users.map(user => user.toJSON())});
      } else {
        throw new Error('Clan does not exist');
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

// Validation middleware goes here

router.post('/', (req, res) => {
  return Clan.create(req.body)
    .then(newClan => {
      res.status(201).json(newClan.toJSON());
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.post('/:clan', (req, res) => {
  Clan.update({id: req.params.clan}, req.body)
    .then(affected => {
      if (affected) {
        res.sendStatus(202);
      } else {
        res.status(400).send('Clan doesn\'t exist');
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.delete('/:clan', (req, res) => {
  Clan.delete({id: req.params.clan})
    .then(affected => {
      if (affected) {
        res.sendStatus(202);
      } else {
        res.status(400).send('Clan doesn\'t exist');
      }
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

module.exports = router;
