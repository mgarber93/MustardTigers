const router = require('express').Router();
const {Clan} = require('../database');

router.get('/', (req, res) => {
  return Clan.findAll(req.query)
    .then(clans => {
      res.json({results: clans});
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.post('/', (req, res) => {
  return Clan.create(req.body)
    .then(newClan => {
      res.status(201).json(newClan);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.get('/:clan', (req, res) => {
});

router.post('/:clan', (req, res) => {
});

router.delete('/:clan', (req, res) => {
});

module.exports = router;