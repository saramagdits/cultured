const db = require('./index');
const UserAuthDB = {};

UserAuthDB.findOneData = async (username) => {
  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username]
  };
  return await db.query(query)
    .then(res => res.rows[0])
    .catch(e => console.log(e.stack));
};
UserAuthDB.findUserByIdData = async (userId) => {
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [userId]
  };
  return await db.query(query)
    .then(res => res.rows[0])
    .catch(e => console.log(e.stack));
};
module.exports = UserAuthDB;
