var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Bennett's NodeJS/MySQL App", active: 'index'  });
});

module.exports = router;
