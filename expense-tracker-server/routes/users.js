var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {

  res.send({
    resCode: 0,
    data: {
    id: req.body.id,
    username: req.body.username
  }})
});

router.post('/register', function(req, res, next) {
  console.log(req.body.un)
  res.send({
    resCode: 0,
    data: {
    id: 1,
    username: `paul_belga`
  }})
});

router.delete('/register', function(req, res, next) {
  res.send({
    resCode: 0,
    data: {
    id: 101,
    username: `paul_belga`
  }})
});

module.exports = router;
