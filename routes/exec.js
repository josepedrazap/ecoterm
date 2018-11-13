var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/temp_agua', function(req, res, next) {
  res.status(200).send('temp');
});

module.exports = router;
