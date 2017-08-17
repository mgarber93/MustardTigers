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
      res.json({results: clan.toJSON()});
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.get('/:clan/members', (req, res) => {
  Clan.model.findOne({
    include: [{
      model: User.model
    }],
    where: {id: req.params.clan}
  })
    .then(({users}) => {
      res.json({results: users.map(member => member.toJSON())});
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

// Validation middleware goes here

router.post('/', (req, res) => {
  return Clan.create(req.body)
    .then(newClan => {
      res.status(201).json(newClan);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.post('/:clan', (req, res) => {
});

router.delete('/:clan', (req, res) => {
});

module.exports = router;
