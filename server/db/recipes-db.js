const db = require('./index');
const Recipes = {};

//========================
// GUIDELINES FOR RECIPES TABLE DATA
//========================
// Table requires the following columns and data types
// 1. author: integer (this is a foreign key linked to the user id)
// 2. title: text
// 3. description: text
// 4. image_path: text
// 5. prep_time: interval eg. '3 hours 2 minutes'
// 6. ready_time: interval eg. '1 year 2 months 3 days' ect.
// 7. difficulty: text
// 8. times_favorited: integer
// 9. date_created: timestamp with timezone eg. 2018-10-19 10:23:54+02

// SELECT all recipe rows and return data
Recipes.getAllRecipesData = async () => {
  return await db.query('SELECT * FROM recipes')
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

// INSERT a new recipe row
Recipes.createNewRecipeData = async (queryValues) => {
  const query = {
    text: 'INSERT INTO recipes(author, title, description, image_path, prep_time, ready_time, difficulty, times_favorited, date_created) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    values: queryValues
  };
  return await db.query(query)
    .then(res => res.rows[0].id)
    .catch(e => console.error(e.stack));
};

// SELECT single recipe data
Recipes.getSingleRecipeData = async (recipeId) => {
  const query = {
    text: 'SELECT ' +
      'recipes.id,' +
      'recipes.author,' +
      ' recipes.title,' +
      ' recipes.description,' +
      ' recipes.image_path,' +
      ' recipes.prep_time,' +
      ' recipes.ready_time,' +
      ' recipes.difficulty,' +
      ' recipes.times_favorited,' +
      ' recipes.date_created,' +
      ' recipes_ingredients,' +
      ' ingredients.type,' +
      ' ingredients.quantity,' +
      ' ingredients.unit ' +
      'FROM recipes INNER JOIN recipes_ingredients ON $1 = recipes_ingredients.recipe_id ' +
      'INNER JOIN ingredients ON recipes_ingredients.ingredient_id = ingredients.id ' +
      'WHERE recipes.id = $1',
    values: [recipeId]
  };
  return await db.query(query)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
};

//========================
// GUIDELINES FOR RECIPES_INGREDIENTS TABLE DATA
//========================
// 1. recipe_id: integer
// 2. ingredient_id: integer
// UPDATE recipes-ingredients relational table
Recipes.updateRelationalTable = async (recipeId, ingredientsIds) => {
  const query = {
    text: 'INSERT INTO recipes_ingredients(recipe_id, ingredient_id) VALUES($1, $2) RETURNING *',
    values: [recipeId, ingredientsIds]
  };
  return await db.query(query)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};
module.exports = Recipes;
