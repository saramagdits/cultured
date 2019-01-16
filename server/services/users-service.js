const db = require('../db/users-db');
const Users = {};
// GET all users
Users.getAllUsers = () => {
  return db.getAllUsersData();
};

// CREATE a new user and return the data
Users.createUser = (queryValues) => {
  // TODO upload photo here, retrieve path to pass on to db
  return db.createUserData(queryValues);
};

// GET a single user by id
Users.getSingleUser = (id) => {
  return db.getSingleUserData(id);
};

// UPDATE a single user's data and return it
Users.updateSingleUser = (id, queryValues) => {
  return db.updateSingleUserData(id, queryValues);
};
module.exports = Users;
