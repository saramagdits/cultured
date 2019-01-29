const db = require('../db/userAuth-db');
// =======================
// PASSWORD HASHING
// =======================
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserAuth = {};
UserAuth.findUser = async (userInfo) => {
  const userExists = await db.findUserData(userInfo.username);
  return (userExists ? userExists : null);
};
UserAuth.findUserById = async (userId) => {
  const user = await db.findUserByIdData(userId);
  if (user) {return {err: null, user: user}}
  else {return {err:true, user:null}}
};
UserAuth.hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds).then((hash) => hash);
};
UserAuth.verifyPassword = async (plainPassword, passwordHash) => {
  return await bcrypt.compare(plainPassword, passwordHash)
    .then((res) => res)
    .catch(e => console.error(e));
};
module.exports = UserAuth;
