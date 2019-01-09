const index = require('./index');
const users = require('./users');
const recipes = require('./recipes');
const ingredients = require('./ingredients');

module.exports = (app) => {
  app.use('/', index);
  app.use('/users', users);
  // app.use('/recipes', recipes);
  // app.use('/ingredients', ingredients);
  // etc..
};

// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;
