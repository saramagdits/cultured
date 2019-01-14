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
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// export our router to be mounted by the parent application
module.exports = router;
