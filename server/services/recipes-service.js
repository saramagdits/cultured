const recipesDB = require('../db/recipes-db');
const ingredientsDB = require('../db/ingredients-db');
const Recipes = {};

// GET all recipes
Recipes.getAllRecipes = () => {
  return recipesDB.getAllRecipesData();
};

// CREATE a new recipe
Recipes.createNewRecipe = async (queryValues, ingredients) => {
  const recipeId = await recipesDB.createNewRecipeData(queryValues);
  const ingredientsIds = await ingredientsDB.createNewIngredientsData(ingredients);
  const newRecipe = await recipesDB.updateRelationalTable(recipeId, ingredientsIds);
  console.log(newRecipe);
};


module.exports = Recipes;
