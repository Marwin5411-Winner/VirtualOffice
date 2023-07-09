var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config');
const passport = require('passport');

//Set Global Variables
global.config = config;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const documentRouter = require('./routes/documents');
const adminRouter = require('./routes/admin');
const taskRouter = require('./routes/task');
const apiRouter = require('./routes/api');
const directoryRouter = require('./routes/directory');

require('./configs/passport')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/documents', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), documentRouter);
app.use('/admin',passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), adminRouter);
app.use('/tasks', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), taskRouter);
app.use('/api', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), apiRouter);
app.use('/directory', passport.authenticate('jwt', { session: false, failureRedirect: '/auth' }), directoryRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
