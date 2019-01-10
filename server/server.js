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

console.log('Server started...');

module.exports = app;
