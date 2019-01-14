const Router = require('express-promise-router');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

//========================
// GUIDELINES FOR RECIPES TABLE DATA
//========================
// Table requires the following columns and data types
// 1. author: integer (this is a foreign key linked to the user id)
// 2. title: character (255)
// 3. description: text
// 4. image_path: text
// 5. prep_time: interval eg. '3 hours 2 minutes'
// 6. ready_time: interval eg. '1 year 2 months 3 days' ect.
// 7. difficulty: character
// 8. times_favorited: integer
// 9. date_created: timestamp with timezone eg. 2018-10-19 10:23:54+02

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM recipes WHERE title = $1', ['sauerkraut']);
  res.send(rows);
});

/* CREATE a new recipe */
router.post('/', async (req, res, next) => {
  // TODO must accept an image to be parsed by multi-part form parser (multer?), which should return the path to be inserted as avatarPath
  // TODO author must come from passport session data?
  const author = req.body.username;
  const title = req.body.title;
  const description = req.body.description;
  const imagePath = '/shared/images/sauerkraut/12345.png';
  // TODO determine how/where to format these
  const prepTime = '3 hours 2 minutes';
  const readyTime = '2 months 3 days';
  const difficulty = req.body.difficulty;
  const timesFavorited = 0;
  const dateCreated = new Date();

  const query = {
    text: 'INSERT INTO recipes(author, title, description, image_path, prep_time, ready_time, difficulty, times_favorited, date_created) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    values: [author, title, description, imagePath, prepTime, readyTime, difficulty, timesFavorited, dateCreated]
  };
  const { data } = await db.query(query)
  // .then(res => console.log(res.rows[0]))
    .then(res => res)
    .catch(e => console.error(e.stack));
  console.log(data);
  res.send(`You created a recipe with the name ${title}`);
});

// export our router to be mounted by the parent application
module.exports = router;
