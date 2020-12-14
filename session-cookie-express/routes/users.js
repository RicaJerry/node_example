var express = require('express');
const bodyParser = require('body-parser');

var User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user != null){
      var err = new Error("Oups " + req.body.username + "already exists");
      err.status = 403;
      next(err);
    }
    else{
      return User.create({username: req.body.username, password: req.body.password});
    }
  })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({status: "Yosh ! Registration Successful", user: user});
  }, (err) => next(err))
  .catch((err) => next(err))
})

module.exports = router;
