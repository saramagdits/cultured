const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
// =======================
// ENVIRONMENT VARIABLES
// =======================
const env = require('./environment/environment');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
// TODO consider updating location of static files to shared folder
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// ROUTER
// =======================
const mountRoutes = require('./routes/router');
mountRoutes(app);

// ===========================
// DATABASE CONNECTION
// ===========================
// a pool connection creates a bunch of connections initially
// const pool = new Pool(env.db);
//
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

// const client = new Client(env.db);
// client.connect();
// test to add rows
// const date = new Date();
// console.log(date);
// const query = {
//   text: 'INSERT INTO test(first_name, last_name) VALUES($1, $2)',
//   values: ['greg', 'magdits']
// };
// client.query(query)
//   .then(res => console.log(res.rows[0]))
//   .catch(e => console.error(e.stack));

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });

console.log('Server started...');

module.exports = app;
