const Router = require('express-promise-router');
const recipes = require('../services/recipes-service');


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const data = await recipes.getAllRecipes();
  res.send(data);
});

/* CREATE a new recipe */
router.post('/', async (req, res, next) => {
  const queryValues = [
    req.body.username, // TODO should come from passport
    req.body.title,
    req.body.description,
    '/shared/images/recipes/default.png', // TODO should come from multer
    req.body.prepTime,
    req.body.readyTime,
    req.body.difficulty,
    0,
    new Date()
  ];

  const data = await recipes.createNewRecipe(queryValues);

  res.send(data);
});

// export our router to be mounted by the parent application
module.exports = router;
