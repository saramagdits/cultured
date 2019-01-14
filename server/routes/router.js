const index = require('./index-router');
const users = require('./users-router');
const recipes = require('./recipes-router');
const ingredients = require('./ingredients-router');

module.exports = (app) => {
  app.use('/', index);
  app.use('/users', users);
  app.use('/recipes', recipes);
  app.use('/ingredients', ingredients);
};

