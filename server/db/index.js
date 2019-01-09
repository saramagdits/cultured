// Data access code
const { Pool } = require('pg');
const env = require('../environment/environment');

const pool = new Pool(env.db);

module.exports = {
  query: (text, params) => pool.query(text, params)
};
