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
router.get('/search', (req, res) => {
  // Check if there was a title or ingredients specified
  // TODO consider combining these to make it more flexible in accepting multiple query params
  if (req.query.title) {
    recipes.searchByTitle(req.query.title.split(' '))
      .then(data => {
        if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}
      })
      .catch(() => res.status(404).send('Could not find any recipes with that title.'));
  } else if (req.query.ing) {
    recipes.searchByIngredients(req.query.ing.split(' '))
      .then(data => {
        if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}
      })
      .catch(() => res.status(404).send('Could not find any recipes with those ingredients.'))
  } else {
    res.status(404).send('Could not find any recipes.')
  }


});

/* GET recipes listing. */
router.get('/', (req, res) => {
  recipes.getAllRecipes()
    .then(data => {
      if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}
    })
    .catch(() => {res.status(404).send('Could not find any recipes.')});
});

/* GET a single recipe listing by recipe id*/
router.get('/:id', (req, res) => {
  recipes.getSingleRecipe(req.params.id)
    .then(data => {
      if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}
    })
    .catch(() => {res.status(404).send('Could not find that recipe.')})
  // res.json(data);
});

/* GET recipes by category */
router.get('/category/:category', (req, res) => {
  // req.params.category.replace(/\-/, ' ');
  req.params.category = req.params.category.split('-').join(' ');
  recipes.getRecipesByCategory(req.params.category)
    .then(data => {
      if (data.length > 0) {res.json(data)} else {throw 'err'}
    })
    .catch(() => {res.status(404).send('Could not find any recipes in that category.')});
});

/* CREATE a new recipe */
router.post('/', passport.authenticate('basic', {session: false}), upload.single('image'), (req, res) => {
  const queryValues = [
    req.user.id,
    req.body.title,
    req.body.description,
    req.body.category,
    (req.file ? req.file.filename : 'default.png'),
    req.body.prepTime,
    req.body.readyTime,
    req.body.difficulty,
    0,
    new Date()
  ];
  const ingredients = req.body.ingredients;
  recipes.createNewRecipe(queryValues, ingredients)
    .then(data => {
      if (Object.keys(data).length > 0) {res.json(data)} else {throw 'err'}
    })
    .catch(() => {res.status(500).send('Could not create that recipe.')});
});


// export our router to be mounted by the parent application
module.exports = router;
