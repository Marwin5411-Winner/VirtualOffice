var express = require('express');
const passport = require('passport');
var router = express.Router();
const taskController = require('../controllers/taskController');

/* GET home page. */
router.get('/', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), taskController.getTasks);

router.get('/:id', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), taskController.getTask);

router.post('/', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), taskController.addTask);

router.delete('/:id', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), taskController.deleteTask);

router.put('/:id', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), taskController.updateTask);

module.exports = router;