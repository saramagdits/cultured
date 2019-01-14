const db = require('../db/users-db');
const Users = {};
// GET all users
Users.getUsers = () => {
  return db.getUsersData();
};

// CREATE a new user
Users.createUser = (queryValues) => {
  // TODO upload photo here, retrieve path to pass on to db
  return db.createUserData(queryValues);
};
module.exports = Users;
