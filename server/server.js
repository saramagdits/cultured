const express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  userAuth = require('./services/userAuth-service'),
  passport = require('passport'),
  Strategy = require('passport-http');

// =======================
// ENVIRONMENT VARIABLES
// =======================
const env = require('./environment/environment');

// =======================
// APPLICATION CONFIGURATION
// =======================
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// =======================
// USER AUTHENTICATION
// =======================
// Modified from site to use promises instead of callbacks, as userAuth returns a promise
passport.use(new Strategy.BasicStrategy(
  (username, password, done) => {
    userAuth.findUser({username: username}).then(async (user) => {
      if (!user) {
        return done(null, false);
      }
      if (!await userAuth.verifyPassword(password, user.password)) {
        return done(null, false);
      }
      return done(null, user);
    }).catch((err) => {
      return done(err)
    });
  }
));

// =======================
// ROUTER
// =======================
const mountRoutes = require('./routes/router');
mountRoutes(app);

console.log('Server started...');

module.exports = app;
