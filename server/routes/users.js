var express = require('express');
var router = express.Router();
const env = require('./environment/environment');
const Client  = require('pg');

const client = new Client(env.db);
client.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const date = new Date();
  console.log(date);
  const query = {
    text: 'INSERT INTO test(first_name, last_name) VALUES($1, $2)',
    values: ['greg', 'magdits']
  };
  client.query(query)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack));
  res.send('respond with a resource');
});

module.exports = router;