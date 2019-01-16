const db = require('../db/recipes-db');
const Recipes = {};

// GET all users
Recipes.getAllRecipes = () => {
  return db.getAllRecipesData();
};

// CREATE a new user
Recipes.createNewRecipe = (queryValues) => {
  return db.createNewRecipeData(queryValues);
};


module.exports = Recipes;
