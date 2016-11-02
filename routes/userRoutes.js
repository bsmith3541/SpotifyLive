var express = require('express');
var userDb = require('../models/users');
var router = express.Router();

router.post('/add', function(request, response) {
  const results = [];
  // Grab data from http request
  const data = {
    text: req.body.text,
    complete: false
  };
});

router.get('/:id', function(request, response) {

});

module.exports = router;
