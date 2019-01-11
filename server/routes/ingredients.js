const Router = require('express-promise-router');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

//========================
// GUIDELINES FOR INGREDIENTS TABLE DATA
//========================
// Table requires the following columns and data types
// 1. description: text
// 2. image_path: text

/* GET ingredients listing. */
router.get('/', async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM ingredients');
  res.send(rows);
});

/* CREATE a new ingredient */
router.post('/', async (req, res, next) => {
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
