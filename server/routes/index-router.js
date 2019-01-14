const Router = require('express-promise-router');
const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

/* GET index */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// export our router to be mounted by the parent application
module.exports = router;
