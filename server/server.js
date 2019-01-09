const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const env = require('./environment/environment');

const { Pool, Client } = require('pg');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// TODO consider updating location of static files to shared folder
app.use(express.static(path.join(__dirname, 'public')));

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
// // test to add rows
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
// ===========================
// ROUTER
// ===========================

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
console.log('Server started...');

module.exports = app;
