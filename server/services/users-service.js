const db = require('../db/users-db');
const Users = {};
Users.getUsers = () => {
  // return db.query('SELECT * FROM users WHERE username = $1', ['postmantest']);
  return db.getUsersData();
};

module.exports = Users;
