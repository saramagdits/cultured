const recipesDB = require('../db/recipes-db');
const ingredientsDB = require('../db/ingredients-db');
const Recipes = {};

// GET all recipes
Recipes.getAllRecipes = () => {
  return recipesDB.getAllRecipesData();
};

// GET a single recipe
Recipes.getSingleRecipe = (recipeId) => {
  return recipesDB.getSingleRecipeData(recipeId);
};

// CREATE a new recipe
Recipes.createNewRecipe = async (queryValues, ingredients) => {
  // Create the recipe data, retrieve the new id
  const recipeId = await recipesDB.createNewRecipeData(queryValues);
  // Create the ingredient data, retrieve the new ids
  const ingredientsIds = await ingredientsDB.createNewIngredientsData(ingredients);
  console.log(ingredientsIds);
  // Update the relational table using both ideas
  const relationalIds = await recipesDB.updateRelationalTable(recipeId, ingredientsIds);
  const newRecipe = await recipesDB.getSingleRecipeData(recipeId);
  console.log(newRecipe);
  return newRecipe;
};


module.exports = Recipes;
