const Router = require('express-promise-router');
const env = require('../environment/environment');
const recipes = require('../services/recipes-service');
const passport = require('passport');
const multer = require('multer');
const upload = multer({dest: env.upload.recipes});


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
    res.json(data);
  } else if (req.query.ing) {
    const data = await recipes.searchByIngredients(req.query.ing.split(' '));
    res.json(data);
  } else {
    res.status(400).send('Something was wrong with your search formatting')
  }


});

/* GET recipes listing. */
router.get('/', async (req, res) => {
  const data = await recipes.getAllRecipes();
  res.json(data);
});

/* GET a single recipe listing by recipe id*/
router.get('/:id', (req, res) => {
  recipes.getSingleRecipe(req.params.id)
    .then(data => res.json(data))
    .catch(() => {res.status(400).send('Could not find that recipe.')})
  // res.json(data);
});

/* GET recipes by category */
router.get('/category/:category', async (req, res) => {
  // req.params.category.replace(/\-/, ' ');
  req.params.category = req.params.category.split('-').join(' ');
  const data = await recipes.getRecipesByCategory(req.params.category);
  res.json(data);
});

/* CREATE a new recipe */
router.post('/', passport.authenticate('basic', {session: false}), upload.single('image'), async (req, res) => {
  const queryValues = [
    req.user.id,
    req.body.title,
    req.body.description,
    (req.file ? req.file.filename : 'default.png'),
    req.body.prepTime,
    req.body.readyTime,
    req.body.difficulty,
    req.body.category,
    0,
    new Date()
  ];
  const ingredients = req.body.ingredients;
  const data = await recipes.createNewRecipe(queryValues, ingredients);

  res.json(data);
});


// export our router to be mounted by the parent application
module.exports = router;
