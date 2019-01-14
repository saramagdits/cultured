const db = require('./index');
const users = {
  getUsersData : () => {
    return db.query('SELECT * FROM users WHERE username = $1', ['postmantest'])
  }
};

module.exports = users;

//========================
// GUIDELINES FOR USERS TABLE DATA
//========================
// Table requires the following columns and data types
// 1. username: character(255)
// 2. date_created: timestamp with timezone eg. 2018-10-19 10:23:54+02
// 3. avatar_path: text. Should be added by multer, and if successfully added, return file path to be entered in table
