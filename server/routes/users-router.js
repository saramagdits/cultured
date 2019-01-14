const Router = require('express-promise-router');
const users = require('../services/users-service');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const data = await users.getUsers();
  // const { rows } = await db.query('SELECT * FROM users WHERE username = $1', ['postmantest']);
  res.send(data);
});

/* CREATE a new user */
router.post('/', async (req, res, next) => {
  // TODO must accept an image to be parsed by multi-part form parser (multer?), which should return the path to be inserted as avatarPath
  const username = req.body.username;
  const dateCreated = new Date();
  const avatarPath = '/shared/images/avatar/12345.png';
  const query = {
    text: 'INSERT INTO users(username, date_created, avatar_path) VALUES($1, $2, $3)',
    values: [username, dateCreated, avatarPath]
  };
  const { data } = await db.query(query)
    // .then(res => console.log(res.rows[0]))
    .then(res => res)
    .catch(e => console.error(e.stack));
  console.log(data);
  res.send(`You created a user with the username ${username}`);
});

// export our router to be mounted by the parent application
module.exports = router;
