var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  // Please note that you should never do this ...
  // Passing req.query to findAll allows the user to pass whatever argument they want ...
  models.Task.findAll(req.query).then(function (tasks) {
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
