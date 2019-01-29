const Router = require('express-promise-router');
const recipes = require('../services/recipes-service');
const passport = require('passport');


// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// =======================
// Recipes Search Routes
// =======================
// Currently, can search by title, or ingredients, but not both
router.get('/search', async (req, res) => {
  // Check if there was a title or ingredients specified
  // TODO consider combining these to make it more flexible in accepting multiple query params
  if (req.query.title) {
    const data = await recipes.searchByTitle(req.query.title.split(' '));
    res.send(data);
  } else if (req.query.ing) {
    const data = await recipes.searchByIngredients(req.query.ing.split(' '));
    res.send(data);
  } else {res.send('idk man you messed up')}


});

/* GET recipes listing. */
router.get('/', async (req, res) => {
  const data = await recipes.getAllRecipes();
  res.send(data);
});

/* GET a single recipe listing by recipe id*/
router.get('/:id', async (req, res) => {
  const data = await recipes.getSingleRecipe(req.params.id);
  res.send(data);
});

/* CREATE a new recipe */
router.post('/', passport.authenticate('basic', {session: false}), async (req, res) => {
  const queryValues = [
    req.user.id,
    req.body.title,
    req.body.description,
    '/assets/images/recipes/default.png', // TODO should come from multer
    req.body.prepTime,
    req.body.readyTime,
    req.body.difficulty,
    0,
    new Date()
  ];
  const ingredients = req.body.ingredients;
  const data = await recipes.createNewRecipe(queryValues, ingredients);

  res.send(data);
});


// export our router to be mounted by the parent application
module.exports = router;
