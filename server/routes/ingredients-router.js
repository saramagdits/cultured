const Router = require('express-promise-router');
const ingredients = require('../services/ingredients-service');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

/* GET ingredients listing. */
router.get('/', async (req, res, next) => {
  // const { rows } = await db.query('SELECT * FROM ingredients');
  const data  = await ingredients.getIngredients();
  res.send(data);
});

/* CREATE a new ingredient */
router.post('/', async (req, res, next) => {
  const username = req.body.username;
  const dateCreated = new Date();
  const query = {
    text: 'INSERT INTO users(username, date_created) VALUES($1, $2)',
    values: [username, dateCreated]
  };
  const { data } = await db.query(query)
  // .then(res => console.log(res.rows[0]))
    .then(res => res)
    .catch(e => console.error(e.stack));
  console.log(data);
  res.send(`You created an ingredient with the name ${username}`);
});

// export our router to be mounted by the parent application
module.exports = router;
