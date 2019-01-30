const env = require('../environment/environment');
const Router = require('express-promise-router');
const users = require('../services/users-service');
const passport = require('passport');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
const multer  = require('multer');
const upload = multer({ dest: env.upload.avatars });

// ===========================
// /users routes
// ===========================
/* GET all users data */
router.get('/', async (req, res) => {
  const data = await users.getAllUsers();
  res.send(data);
});

/* CREATE a new user and return all user data*/
router.post('/', upload.single('avatar'), async (req, res) => {
  // Make sure the user isn't logged in before creating a new account
  const file = req.file;
  if (!req.headers.authorization) {
    //TODO must accept an image to be parsed by multi-part form parser (multer?), which should return the path to be inserted as avatarPath
    const queryValues = {
      username: req.body.username,
      password: req.body.password,
      dateCreated: new Date(),
      avatarPath: req.file.filename
    };
    // Create the new user
    const newUser = await users.createUser(queryValues);
    res.json(newUser);
  } else {
    return res.status(400).send('You must be logged out to create a new user.');
  }
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
    const queryValues = {avatarPath: '/assets/images/user/updated.png'};

    const data = await users.updateSingleUser(req.params.id, queryValues);
    res.send(data);
  } else {
    res.sendStatus(401)
  }

});

// export our router to be mounted by the parent application
module.exports = router;
