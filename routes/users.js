var express = require('express');
var router = express.Router();
const { createUser } = require('../models/UserModel')
const passport = require('passport');
const jwt = require('jsonwebtoken');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (user) {
      const token = jwt.sign(user, global.config.JWTtoken);
      return res.cookie('user', token).status(200).redirect('/');
    } else {
      return res.status(422).redirect('/auth?error=1');
    }
  })(req, res, next);
});

//Todo: Add Register function
router.post("/register", (req, res, next) => {
  console.log(req.body)
  createUser(req.body).then(() => {
    res.status(200).redirect('/');
  });
})
module.exports = router;
