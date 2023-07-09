var express = require('express');
const passport = require('passport');
var router = express.Router();
const indexController = require('../controllers/indexController');
/* GET home page. */
router.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }),(req, res) => {
    indexController.getIndex(req, res);
})
router.get('/auth', (req, res) => {
    let error = req.query.error;
    if (req.query.error == 1) error = "Invalid Username or Password";
    res.render('auth/login',{ web_title: global.config.WEB.name ,error : error } )
})

router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/auth');
})


module.exports = router;
