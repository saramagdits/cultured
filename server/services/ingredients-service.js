const db = require('../db/ingredients-db');
const Ingredients = {};

// GET all ingredients
Ingredients.getIngredients = () => {
  return db.getIngredientsData();
};

module.exports = Ingredients;
