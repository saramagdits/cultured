const Router = require('express-promise-router');
const passport = require('passport');
const userAuth = require('../services/userAuth-service');
const userAuthModel = require('../models/userAuth-model');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// TODO reqrite this to accept a username and password in the body, authenticate it, and pass back a success or incorrect credentials status
router.post('/', (req, res) => {
  // Make sure both a username and password are provided
  if (req.body.username && req.body.password) {
    // const userCred = {
    //   username: req.body.username,
    //   password: req.body.password
    // };
    userAuth.findUser({username: req.body.username}).then(async (user) => {
      if (!user) {
        // return done(null, false);s
        throw 'err';
      }
      if (!await userAuth.verifyPassword(req.body.password, user.password)) {
        // return done(null, false);
        throw 'err';
      }
      return userAuthModel.single(user);
    })
      .then(user => res.json(user))
      .catch(() => {
      res.status(401).send('Incorrect credentials.')
    });
  } else {
    res.status(401).send('Incorrect credentials.')
  }

});
// router.post('/',
//   passport.authenticate('basic', {session: false}),
//   function (req, res) {
//     res.json(req.user);
//   });

// export our router to be mounted by the parent application
module.exports = router;
