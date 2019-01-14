const db = require('./index');
const Users = {};

//========================
// GUIDELINES FOR USERS TABLE DATA
//========================
// Table requires the following columns and data types
// 1. username: character(255)
// 2. date_created: timestamp with timezone eg. 2018-10-19 10:23:54+02
// 3. avatar_path: text. Should be added by multer, and if successfully added, return file path to be entered in table

// SELECT rows for all users
Users.getUsersData = () => {
  return db.query('SELECT * FROM users WHERE username = $1', ['postmantest']);
};

// INSERT row for new user
Users.createUserData = async (queryValues) => {
  const query = {
    text: 'INSERT INTO users(username, date_created, avatar_path) VALUES($1, $2, $3)',
    values: [queryValues.username, queryValues.dateCreated, queryValues.avatarPath]
  };
  return { data } = await db.query(query)
    .then(res => res)
    .catch(e => console.error(e.stack));
};
module.exports = Users;
