const Router = require('express-promise-router');
const users = require('../services/users-service');
const passport = require('passport');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// ===========================
// /users routes
// ===========================
/* GET all users data */
router.get('/', async (req, res) => {
  const data = await users.getAllUsers();
  res.send(data);
});

/* CREATE a new user and return all user data*/
// TODO user should not be logged in here
router.post('/', async (req, res) => {
  // TODO must accept an image to be parsed by multi-part form parser (multer?), which should return the path to be inserted as avatarPath
  const queryValues = {
    username: req.body.username,
    password: req.body.password,
    dateCreated: new Date(),
    avatarPath: '/assets/images/users/default.png'
  };
  // TODO check if user already exists before creating it
  const data = await users.createUser(queryValues);
  res.send(data);
});

// ===========================
// /users/:id routes
// ===========================
/* GET user listing by id */
router.get('/:id', async (req, res) => {
  const data = await users.getSingleUser(req.params.id);
  res.send(data);
});
/* UPDATE a user's data and returns it*/
router.put('/:id', passport.authenticate('basic', {session: false}), async (req, res) => {
  // Check if user exists and user id matches
  if (req.user && req.params.id === req.user.id.toString()) {
    // TODO check if avatar image has changed here
    // TODO eventually users should be able to update their password
    const queryValues = {avatarPath: '/assets/images/user/updated.png'};

    const data = await users.updateSingleUser(req.params.id, queryValues);
    res.send(data);
  } else {
    res.sendStatus(401)
  }

});

// export our router to be mounted by the parent application
module.exports = router;
