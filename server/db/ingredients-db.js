const db = require('./index');
const Ingredients = {};

//========================
// GUIDELINES FOR INGREDIENTS TABLE DATA
//========================
// Table requires the following columns and data types
// 1. type: text
// 2. quantity: integer
// 3. unit: text

Ingredients.getIngredientsData = async () => {
  return await db.query('SELECT * FROM ingredients')
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
  console.log(typeof ingArray);
  return await Promise.all(ingArray.map( async ing => {
    //console.log(`ing is ${ing}`);
    const query = {
      text: 'INSERT into ingredients(type, quantity, unit) VALUES ($1, $2, $3) RETURNING *',
      values: [ing, 2, 'lbs']
    };
    return await db.query(query)
      .then(res => {return res.rows[0].id})
      .catch(e => console.error(e.stack));
  }));
};

module.exports = Ingredients;
