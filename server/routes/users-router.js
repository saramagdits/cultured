const Router = require('express-promise-router');
const users = require('../services/users-service');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const data = await users.getUsers();
  res.send(data);
});

/* CREATE a new user */
router.post('/', async (req, res, next) => {
  // TODO must accept an image to be parsed by multi-part form parser (multer?), which should return the path to be inserted as avatarPath
  // TODO consider assigning a default user avatar here, to be replaced later only if one was chosen
  const queryValues = {username: req.body.username, dateCreated: new Date(), avatarPath: '/shared/images/avatar/default.png'};

  const data = await users.createUser(queryValues);
  res.send(`You created a user with the username ${queryValues.username}`);
});

// export our router to be mounted by the parent application
module.exports = router;
