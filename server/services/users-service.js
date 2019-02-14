const db = require('../db/users-db');
const userAuth = require('../services/userAuth-service');
const userModel = require('../models/user-model');
const userAuthModel = require('../models/userAuth-model');
const Users = {};

// GET all users
Users.getAllUsers = async () => {
  const data = await db.getAllUsersData();
  return userModel.multiple(data);
};

// CREATE a new user and return the data
Users.createUser = async (queryValues) => {
  // TODO upload photo here, retrieve path to pass on to db
  // Hash the password before storing it
  queryValues.password = await userAuth.hashPassword(queryValues.password);
  return await db.createUserData(queryValues);
  // const data = await db.createUserData(queryValues);
  // return userAuthModel.single(data);
};

// GET a single user by id
Users.getSingleUser = async (id) => {
  const data = await db.getSingleUserData(id);
  return userModel.single(data);
};

// UPDATE a single user's data and return it
Users.updateSingleUser = (id, queryValues) => {
  return db.updateSingleUserData(id, queryValues);
};
module.exports = Users;
