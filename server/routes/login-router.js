const Router = require('express-promise-router');
const passport = require('passport');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

router.post('/',
  passport.authenticate('basic', {session: false}),
  function (req, res) {
    res.json(req.user);
  });

// export our router to be mounted by the parent application
module.exports = router;
