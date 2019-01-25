const express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      userAuth = require('./services/userAuth-service'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      session = require('express-session');

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
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: env.sessionSecret, resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// =======================
// USER AUTHENTICATION
// =======================
passport.use(new LocalStrategy(
  function(username, password, done) {
    userAuth.findOne({ username: username }).then((err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
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
