var express = require('express');
var router = express.Router();

const env = require('./environment/environment');
const Client  = require('pg');

const client = new Client(env.db);
client.connect();

/* GET ingredients listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
