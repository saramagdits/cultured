const db = require('./index');
const Ingredients = {};

//========================
// GUIDELINES FOR INGREDIENTS TABLE DATA
//========================
// Table requires the following columns and data types
// 1. description: text
// 2. type: character (255)
// 3. quantity: integer
// 4. unit: character 255

Ingredients.getIngredientsData = () => {
  return db.query('SELECT * FROM ingredients')
};

module.exports = Ingredients;
