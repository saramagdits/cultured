const db = require('../db/userAuth-db');
const UserAuth = {};
UserAuth.findUser = async (userInfo) => {
  const userExists = await db.findOneData(userInfo.username);
  return (userExists ? userExists : null);
};
UserAuth.findUserById = async (userId) => {
  const user = await db.findUserByIdData(userId);
  if (user) {return {err: null, user: user}}
  else {return {err:true, user:null}}
};
module.exports = UserAuth;
