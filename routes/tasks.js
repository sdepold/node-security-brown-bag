var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Task.findAll().then(function (tasks) {
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
