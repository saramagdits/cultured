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
// 7. difficulty: text,
// 8. category: text,
// 9. times_favorited: integer
// 10. date_created: timestamp with timezone eg. 2018-10-19 10:23:54+02

// SELECT all recipe rows and return data
Recipes.getAllRecipesData = async () => {
  return await db.query('SELECT * FROM recipes')
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

// INSERT a new recipe row
Recipes.createNewRecipeData = async (queryValues) => {
  const query = {
    text: 'INSERT INTO recipes(author, title, description, category, image_path, prep_time, ready_time, difficulty, times_favorited, date_created) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
    values: queryValues
  };
  return await db.query(query)
    .then(res => res.rows[0].id)
    .catch(e => console.error(e.stack));
};

Recipes.getSingleRecipeData = async (recipeId) => {
  const query = {
    text: 'SELECT\n' +
      'r.id,\n'+
      'r.title,\n' +
      'r.description,\n' +
      'r.category,\n' +
      'r.image_path,\n' +
      'r.prep_time,\n' +
      'r.ready_time,\n' +
      'r.difficulty,\n' +
      'r.times_favorited,\n' +
      'r.date_created,\n' +
      'i.value,\n' +
      'i.quantity,\n' +
      'i.unit,\n' +
      'u.username AS author,\n' +
      'u.avatar_path AS author_avatar\n' +
      'FROM\n' +
      'recipes r\n' +
      'INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id\n' +
      'INNER JOIN ingredients i ON ri.ingredient_id = i.id\n' +
      'INNER JOIN users u on r.author = u.id\n' +
      'WHERE r.id = $1',
    values: [recipeId]
  };
  return await db.query(query)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

// SELECT recipes by author id
Recipes.getRecipesByAuthorIdData = async (authorId) => {
  const query = {
    text: 'SELECT\n' +
      'r.id,\n'+
      'r.title,\n' +
      'r.description,\n' +
      'r.category,\n' +
      'r.image_path,\n' +
      'r.prep_time,\n' +
      'r.ready_time,\n' +
      'r.difficulty,\n' +
      'r.times_favorited,\n' +
      'r.date_created,\n' +
      'i.value,\n' +
      'i.quantity,\n' +
      'i.unit,\n' +
      'u.username AS author,\n' +
      'u.avatar_path AS author_avatar\n' +
      'FROM\n' +
      'recipes r\n' +
      'INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id\n' +
      'INNER JOIN ingredients i ON ri.ingredient_id = i.id\n' +
      'INNER JOIN users u on r.author = u.id\n' +
      'WHERE r.author = $1',
    values: [authorId]
  };
  return await db.query(query)
    .then(res => {return res.rows})
    .catch(e => console.error(e.stack));
};
// SELECT recipes by category
Recipes.getRecipesByCategoryData = async (category) => {
  const query = {
    text: 'SELECT\n' +
      'r.id,\n'+
      'r.title,\n' +
      'r.description,\n' +
      'r.category,\n' +
      'r.image_path,\n' +
      'r.prep_time,\n' +
      'r.ready_time,\n' +
      'r.difficulty,\n' +
      'r.times_favorited,\n' +
      'r.date_created,\n' +
      'i.value,\n' +
      'i.quantity,\n' +
      'i.unit,\n' +
      'u.username AS author,\n' +
      'u.avatar_path AS author_avatar\n' +
      'FROM\n' +
      'recipes r\n' +
      'INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id\n' +
      'INNER JOIN ingredients i ON ri.ingredient_id = i.id\n' +
      'INNER JOIN users u on r.author = u.id\n' +
      'WHERE r.category = $1',
    values: [category]
  };
  return await db.query(query)
    .then(res => {return res.rows})
    .catch(e => console.error(e.stack));
};

// GET recent recipes with specified quantity
Recipes.getRecentRecipesData = async (quantity) => {
  const query = {
    text: 'SELECT\n' +
      'DISTINCT(r.id),\n'+
      'r.title,\n' +
      'r.description,\n' +
      'r.category,\n' +
      'r.image_path,\n' +
      'r.prep_time,\n' +
      'r.ready_time,\n' +
      'r.difficulty,\n' +
      'r.times_favorited,\n' +
      'r.date_created,\n' +
      'i.value,\n' +
      'i.quantity,\n' +
      'i.unit,\n' +
      'u.username AS author,\n' +
      'u.avatar_path AS author_avatar\n' +
      'FROM\n' +
      'recipes r\n' +
      'INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id\n' +
      'INNER JOIN ingredients i ON ri.ingredient_id = i.id\n' +
      'INNER JOIN users u on r.author = u.id\n' +
      'where r.id in (select distinct(r2.id)\n' +
      'from recipes r2 limit $1)'+
      'ORDER BY date_created DESC',
    values: [quantity]
  };
  return await db.query(query)
    .then(res => {return res.rows})
    .catch(e => console.error(e.stack));
};

//========================
// GUIDELINES FOR RECIPES_INGREDIENTS TABLE DATA
//========================
// 1. recipe_id: integer
// 2. ingredient_id: integer
// UPDATE recipes-ingredients relational table
Recipes.updateRelationalTable = async (recipeId, ingIdArray) => {
  return await Promise.all(ingIdArray.map( async ingId => {
    const query = {
      text: 'INSERT INTO recipes_ingredients(recipe_id, ingredient_id) VALUES($1, $2) RETURNING *',
      values: [recipeId, ingId]
    };
    return await db.query(query)
      .then(res => {return res.rows[0].id})
      .catch(e => console.error(e.stack));
  }));
};

//======================
// Recipes Search Methods
//======================
Recipes.searchByTitleData = async (titles) => {
  // Titles must be escaped due to a known problem with node-postgreSQL using the values as string literals
  // See helpful page: https://stackoverflow.com/questions/19471756/how-to-make-a-like-search-in-postgresql-and-node-js
  const titlesEscaped = titles.map((title) => {return '%' +  title + '%'});
  let likeStatements = '';
  for (let i=1; i<titles.length+1; i++){
    if (i === titles.length) {likeStatements += 'r.title LIKE $'+i}
    else {likeStatements += 'r.title LIKE $'+i+' OR '}
  }
  const query = {
    text: 'SELECT\n' +
      'r.id,\n'+
      'r.title,\n' +
      'r.description,\n' +
      'r.category,\n' +
      'r.image_path,\n' +
      'r.prep_time,\n' +
      'r.ready_time,\n' +
      'r.difficulty,\n' +
      'r.times_favorited,\n' +
      'r.date_created,\n' +
      'i.value,\n' +
      'i.quantity,\n' +
      'i.unit,\n' +
      'u.username AS author,\n' +
      'u.avatar_path AS author_avatar\n' +
      'FROM\n' +
      'recipes r\n' +
      'INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id\n' +
      'INNER JOIN ingredients i ON ri.ingredient_id = i.id\n' +
      'INNER JOIN users u on r.author = u.id\n' +
      'WHERE '+ likeStatements,
    values: titlesEscaped
  };
  return await db.query(query)
    .then(res => {return res.rows})
    .catch(e => console.error(e.stack));
};

// Search for recipes by ingredient
Recipes.searchByIngredientsData = async (ingredients) => {
  // Titles must be escaped due to a known problem with node-postgreSQL using the values as string literals
  // See helpful page: https://stackoverflow.com/questions/19471756/how-to-make-a-like-search-in-postgresql-and-node-js
  const ingredientsEscaped = ingredients.map((ing) => {return '%' +  ing + '%'});
  let likeStatements = '';
  for (let i=1; i<ingredients.length+1; i++){
    if (i === ingredients.length) {likeStatements += 'i.value LIKE $'+i}
    else {likeStatements += 'i.value LIKE $'+i+' OR '}
  }
  // Select recipe IDs first, then select ingredients
  const query = {
    text: 'SELECT\n' +
      'r.id,\n'+
      'r.title,\n' +
      'r.description,\n' +
      'r.image_path,\n' +
      'r.prep_time,\n' +
      'r.ready_time,\n' +
      'r.difficulty,\n' +
      'r.category,\n' +
      'r.times_favorited,\n' +
      'r.date_created,\n' +
      'i.value,\n' +
      'i.quantity,\n' +
      'i.unit,\n' +
      'u.username AS author,\n' +
      'u.avatar_path AS author_avatar\n' +
      'FROM\n' +
      'recipes r\n' +
      'INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id\n' +
      'INNER JOIN ingredients i ON ri.ingredient_id = i.id\n' +
      'INNER JOIN users u on r.author = u.id\n' +
      'WHERE r.id IN(\n' +
        'SELECT r.id\n' +
        'FROM recipes r\n' +
        'INNER JOIN recipes_ingredients ri ON r.id = ri.recipe_id\n' +
        'INNER JOIN ingredients i ON ri.ingredient_id = i.id\n' +
        'WHERE ' + likeStatements + ')',
    values: ingredientsEscaped
  };
  return await db.query(query)
    .then(res => {return res.rows})
    .catch(e => console.error(e.stack));
};
module.exports = Recipes;
