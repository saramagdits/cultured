const env = require('../environment/environment');
const Router = require('express-promise-router');
const users = require('../services/users-service');
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
    console.log('ur good');
    next()
  } else {
    res.status(400).send('Please log out before creating a new user');
  }
};

// ===========================
// /users routes
// ===========================
/* GET all users data */
router.get('/', async (req, res) => {
  const data = await users.getAllUsers();
  res.json(data);
});

/* CREATE a new user and return all user data*/
router.post('/', checkHeaders, upload.single('avatar'), async (req, res) => {
  const queryValues = {
    username: req.body.username,
    password: req.body.password,
    dateCreated: new Date(),
    avatarPath: (req.file ? req.file.filename : 'default.png')
  };
  // Create the new user
  const newUser = await users.createUser(queryValues);
  res.json(newUser);
});


// ===========================
// /users/:id routes
// ===========================
/* GET user listing by id */
router.get('/:id', async (req, res) => {
  const data = await users.getSingleUser(req.params.id);
  res.json(data);
});
/* UPDATE a user's data and returns it*/
router.put('/:id', passport.authenticate('basic', {session: false}), async (req, res) => {
  // Check if user exists and user id matches
  if (req.user && req.params.id === req.user.id.toString()) {
    // TODO check if avatar image has changed here
    const queryValues = {avatarPath: '/assets/images/user/updated.png'};

    const data = await users.updateSingleUser(req.params.id, queryValues);
    res.json(data);
  } else {
    res.status(401).send('You don\'t have permission to do that.');
  }

});

// export our router to be mounted by the parent application
module.exports = router;
