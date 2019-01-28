const db = require('./index');
const Users = {};

//========================
// GUIDELINES FOR USERS TABLE DATA
//========================
// Table requires the following columns and data types
// 1. id: [PK] serial (automatically incremented)
// 2. username: text
// 3. date_created: timestamp with timezone eg. 2018-10-19 10:23:54+02
// 4. avatar_path: text. Should be added by multer, and if successfully added, return file path to be entered in table

/* SELECT rows for all users */
Users.getAllUsersData = async () => {
  return await db.query('SELECT id, username, date_created, avatar_path FROM users')
    .then(res => res.rows)
    .catch(e => console.error(e.stack));
};

/* INSERT row for new user and return that new row*/
Users.createUserData = async (queryValues) => {
  const query = {
    text: 'INSERT INTO users(username, password, date_created, avatar_path) VALUES($1, $2, $3, $4) RETURNING *',
    values: [queryValues.username, queryValues.password, queryValues.dateCreated, queryValues.avatarPath]
  };
  return await db.query(query)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
};

/* SELECT row for single user */
Users.getSingleUserData = async (id) => {
  return await db.query(`SELECT id, username, date_created, avatar_path FROM users WHERE id = ${id}`)
    .then((res) => res.rows[0])
    .catch(e => console.error(e.stack));
};

/* UPDATE row for single user and return that new row*/
Users.updateSingleUserData = async (id, queryValues) => {
  const query = {
    text: 'UPDATE users SET avatar_path = $2 WHERE id = $1 RETURNING *',
    values: [id, queryValues.avatarPath]
  };
  return await db.query(query)
    .then(res => res.rows[0])
    .catch(e => console.error(e.stack));
};
module.exports = Users;
