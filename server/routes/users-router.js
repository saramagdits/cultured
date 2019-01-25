const Router = require('express-promise-router');
const users = require('../services/users-service');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// ===========================
// /users routes
// ===========================
/* GET all users data */
router.get('/', async (req, res, next) => {
  const data = await users.getAllUsers();
  res.send(data);
});

/* CREATE a new user and return all user data*/
router.post('/', async (req, res, next) => {
  // TODO must accept an image to be parsed by multi-part form parser (multer?), which should return the path to be inserted as avatarPath
  const queryValues = {
    username: req.body.username,
    dateCreated: new Date(),
    avatarPath: '/assets/images/users/default.png'
  };

  const data = await users.createUser(queryValues);
  res.send(data);
});

// ===========================
// /users/:id routes
// ===========================
/* GET user listing by id */
router.get('/:id', async (req, res, next) => {
  const data = await users.getSingleUser(req.params.id);
  res.send(data);
});
/* UPDATE a user's data and returns it*/
router.put('/:id', async (req, res, next) => {
  // TODO check if avatar image has changed here
  // TODO eventually users should be able to update their password
  const queryValues = {avatarPath: '/assets/images/user/updated.png'};

  const data = await users.updateSingleUser(req.params.id, queryValues);
  res.send(data);
});

// export our router to be mounted by the parent application
module.exports = router;
