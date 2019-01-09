const Router = require('express-promise-router');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// const env = require('../environment/environment');
// const { Pool, Client } = require('pg');
//
// const client = new Client(env.db);
// await client.connect();

//========================
// GUIDELINES FOR USERS TABLE DATA
//========================
// Table requires the following columns and data types
// 1. username: character(255)
// 2. date_created: timestamp with timezone eg. 2018-10-19 10:23:54+02
// 3. avatar_path: text. Should be added by multer, and if successfully added, return file path to be entered in table

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM users WHERE username = $1', ['postmantest']);
  res.send(rows);
  // const query = {
  //   text: 'SELECT * FROM users'
  // };
  // const data = await client.query(query)
  //   .then(res => res.rows)
  //   .catch(e => console.error(e.stack));
  // res.send(data);
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
  // res.send(`you added ${username} to the database`);
});

// export our router to be mounted by the parent application
module.exports = router;
