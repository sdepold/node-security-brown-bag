var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  var limit = parseInt(req.query.limit, 10);

  models.Task.findAll({ limit }).then(function (tasks) {
    res.send({
      entries: tasks
    });
  })
});

router.post('/', function(req, res, next) {
  models.Task.create(req.body, { fields: ['title'] }).then(function (task) {
    res.send(task);
  });
});

module.exports = router;
