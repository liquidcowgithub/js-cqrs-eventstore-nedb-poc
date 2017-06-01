const express = require('express')
const router = express.Router()
const birds = require('../domain/birds')
const uuidV4 = require('uuid/v4');

router.get('/', function (req, res, next) {
  req.db.birds.find({}, function (err, birds) {
    if (err) return next(err)
    res.json(birds)
  })
})

router.get('/:id', function (req, res, next) {
  req.db.birds.findOne({ id: req.params.id }, function (err, bird) {
    if (err) return next(err)
    if (!bird) return res.sendStatus(404)
    res.json(bird)
  })
})

router.put('/:id', function (req, res, next) {
  const event = {
    type: birds.events.updated,
    id: req.params.id,
    name: 'greater duck',
    weight: 7
  }

  req.dispatch(event, function (err, bird) {
    if (err) return next(err)
    res.json(bird)
  })
})


router.post('/', function (req, res, next) {
  const event = {
    type: birds.events.added,
    id: uuidV4(),
    name: 'lesser duck',
    weight: 5
  }

  req.dispatch(event, function (err, bird) {
    if (err) return next(err)
    res.json(bird)
  })
})

router.delete('/:id', function (req, res, next) {
  const event = {
    type: birds.events.deleted,
    id: req.params.id
  }

  req.dispatch(event, function (err, bird) {
    if (err) return next(err)
    res.sendStatus(202)
  })
})


module.exports = router