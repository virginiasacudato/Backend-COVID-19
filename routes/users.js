var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Virginia'}]});
});

module.exports = router;
