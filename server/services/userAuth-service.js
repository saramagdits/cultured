const db = require('../db/userAuth-db');
const UserAuth = {};
UserAuth.findOne = async (userInfo) => {
  return await db.findOneData(userInfo.username);
};
module.exports = UserAuth;
