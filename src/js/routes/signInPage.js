const express = require('express');
const router = new express.Router();

router.get('/', function(req, res, next) {
  res.render('signInPage');
});

module.exports = router;
