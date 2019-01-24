const recipesDB = require('../db/recipes-db');
const ingredientsDB = require('../db/ingredients-db');
const recipesModel = require('../models/recipes-model');
const Recipes = {};

// GET all recipes
Recipes.getAllRecipes = () => {
  return recipesDB.getAllRecipesData();
};

// GET a single recipe
Recipes.getSingleRecipe = async (recipeId) => {
  const recipeData = await recipesDB.getSingleRecipeData(recipeId);
  return recipesModel.single(recipeData);
};
// Recipes.getSingleRecipe = async (recipeId) => {
//   const recipeData = await recipesDB.getSingleRecipeData(recipeId);
//   const ingredientsData = await ingredientsDB.getIngredientsData(recipeId);
//   return { recipeData, ingredients: ingredientsData };
// };

// CREATE a new recipe
Recipes.createNewRecipe = async (queryValues, ingredients) => {
  // Create the recipe data, retrieve the new id
  const recipeId = await recipesDB.createNewRecipeData(queryValues);
  // Create the ingredient data, retrieve the new ids
  const ingredientsIds = await ingredientsDB.createNewIngredientsData(ingredients);
  // Update the relational table using both ideas
  await recipesDB.updateRelationalTable(recipeId, ingredientsIds);
  const recipeData = await recipesDB.getSingleRecipeData(recipeId);
  // const ingredientsData =  await ingredientsDB.getIngredientsData(recipeId);
  // return { recipeData, ingredients: ingredientsData };
  return recipesModel.single(recipeData);
};

// ==================
// Recipe Search Methods
// ==================

// Search by title keywords. Accepts an array of titles
Recipes.searchByTitle = async (titles) => {
  // Request the recipes data from the db
  const recipeData = await recipesDB.searchByTitleData(titles);
  return recipeData;
  // Model the data
  // Return data to service
};

// Search by ingredients. Accepts an array of ingredients
Recipes.searchByIngredients = (ingredients) => {
  console.log(ingredients)
  // Request the recipes data from the db
  // Model the data
  // Return data to service
};
module.exports = Recipes;
