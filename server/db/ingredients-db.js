const db = require('./index');
const Ingredients = {};

//========================
// GUIDELINES FOR INGREDIENTS TABLE DATA
//========================
// Table requires the following columns and data types
// 1. type: text
// 2. quantity: integer
// 3. unit: text

// Get all ingredients belonging to a recipe
Ingredients.getIngredientsData = async (recipeId) => {
  const query = {
    text: 'SELECT type, quantity, unit FROM ingredients i INNER JOIN recipes_ingredients ri ON i.id = ri.ingredient_id WHERE ri.recipe_id = $1',
    values: [recipeId]
  };
  return await db.query(query)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

// Create new ingredients data
// Ingredients.createNewIngredientsData = async (ing) => {
//   const query = {
//     text: 'INSERT into ingredients(type, quantity, unit) VALUES ($1, $2, $3) RETURNING * ',
//     values: [ing, 2, 'lbs']
//   };
//   return await db.query(query)
//     .then(res => res.rows[0].id)
//     .catch(e => console.error(e.stack));
// };

Ingredients.createNewIngredientsData = async (ingArray) => {
  return await Promise.all(ingArray.map( async ing => {
    //console.log(`ing is ${ing}`);
    const query = {
      text: 'INSERT into ingredients(type, quantity, unit) VALUES ($1, $2, $3) RETURNING *',
      values: [ing.type, ing.quantity, ing.unit]
    };
    return await db.query(query)
      .then(res => res.rows[0].id)
      .catch(e => console.error(e.stack));
  }));
};

module.exports = Ingredients;
