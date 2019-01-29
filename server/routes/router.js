const index = require('./index-router'),
      login = require('./login-router'),
      users = require('./users-router'),
      recipes = require('./recipes-router'),
      ingredients = require('./ingredients-router');

module.exports = (app) => {
  app.use('/', index);
  app.use('/login', login);
  app.use('/users', users);
  app.use('/recipes', recipes);
  app.use('/ingredients', ingredients);
};

