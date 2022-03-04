const express = require("express");
const path = require('path');
const createError = require('http-errors');
const app = express();
const port = 3000;

const jsSource = './src/js/routes/';
const paths = {
  feed: jsSource + 'appPage',
  home: jsSource + 'signInPage',
  signup: jsSource + 'signUpPage',
  staticFiles: './src/'
};

const appPageRoute = require(paths.feed);
const homePageRoute = require(paths.home);
const signUpPageRoute = require(paths.signup);

app.set('views', path.join(__dirname, './src/views/'));
app.set('view engine', 'pug');

app.use(express.static(paths.staticFiles));

app.use('/feed', appPageRoute);
app.use('/', homePageRoute);
app.use('/signin', homePageRoute);
app.use('/signup', signUpPageRoute);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;