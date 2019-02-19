const env = require('../environment/environment');
const Router = require('express-promise-router');
const users = require('../services/users-service');
const userModel = require('../models/user-model');
const passport = require('passport');
const multer = require('multer');
const upload = multer({dest: env.upload.avatars});

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// ===========================
// Middleware
// ===========================
// Middleware to check if authorization headers were passed
// Make sure that a user is not already logged in before making an account
const checkHeaders = (req, res, next) => {
  if (!req.headers.authorization) {
    next()
  } else {
    res.status(400).send('Please log out before creating a new user');
  }
};

// ===========================
// /users routes
// ===========================
/* GET all users data */
router.get('/', (req, res) => {
  users.getAllUsers()
    .then(data => {if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}})
    .catch(() => res.status(404).send('Could not find any users.'));
});

/* CREATE a new user and return all user data*/
router.post('/', checkHeaders, upload.single('avatar'), (req, res) => {
  // Check that both a username and password were provided
  if (req.body.username && req.body.password) {
    const queryValues = {
      username: req.body.username,
      password: req.body.password,
      dateCreated: new Date(),
      avatarPath: (req.file ? req.file.filename : 'default.png')
    };
    // Create the new user
    users.createUser(queryValues)
      .then(data => {if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}})
      .catch(() => res.status(500).send('Unable to create new user.'));
  } else {res.status(400).send('Both a username and password are required')}
});


// ===========================
// /users/:id routes
// ===========================
/* GET user listing by id */
router.get('/:id', (req, res) => {
  // Get the user listing
  users.getSingleUser(req.params.id)
    .then(data => {if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}})
    .catch(() => res.status(404).send('Couldn\'t find that user.'));
});

/* UPDATE a user's data and returns it*/
router.put('/:id', passport.authenticate('basic', {session: false}), (req, res) => {
  // Check if user exists and user id matches
  if (req.user && req.params.id === req.user.id.toString()) {
    // TODO check if avatar image has changed here
    const queryValues = {avatarPath: '/assets/images/user/updated.png'};
    // Update the user
    users.updateSingleUser(req.params.id, queryValues)
      .then(user => userModel.single(user))
      .then(data => {if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}})
      .catch(() => res.status(500).send('Unable to update the user.'));
  } else {
    res.status(401).send('You don\'t have permission to do that.');
  }
});

// export our router to be mounted by the parent application
module.exports = router;
