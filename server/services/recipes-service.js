const recipesDB = require('../db/recipes-db');
const ingredientsDB = require('../db/ingredients-db');
const model = require('../models/recipes-model');
const Recipes = {};

// GET all recipes
Recipes.getAllRecipes = () => {
  return recipesDB.getAllRecipesData();
};

// GET a single recipe
Recipes.getSingleRecipe = async (recipeId) => {
  const recipeData = await recipesDB.getSingleRecipeData(recipeId);
  return recipeData;
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
  const ingredientsData =  await ingredientsDB.getIngredientsData(recipeId);
  return { recipeData, ingredients: ingredientsData };
};


module.exports = Recipes;
