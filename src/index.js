const express = require("express");
const path = require('path');
const createError = require('http-errors');
const app = express();
const port = 3000;

const jsSource = './js/routes/';
const paths = {
  feed: jsSource + 'appPage',
  home: jsSource + 'signInPage',
  signup: jsSource + 'signUpPage',
  staticFiles: './src/'
};

const appPageRoute = require(paths.feed);
const homePageRoute = require(paths.home);
const signUpPageRoute = require(paths.signup);

app.set('views', path.join(__dirname, './views/'));
app.set('view engine', 'pug');

app.use(express.static(paths.staticFiles));

app.use('/feed', appPageRoute);
app.use('/', homePageRoute);
app.use('/signin', homePageRoute);
app.use('/signup', signUpPageRoute);

module.exports = app;