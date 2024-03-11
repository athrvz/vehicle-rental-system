const path = require('path');

const currentFileName = (path.basename(__filename));

const query = `
  CREATE TABLE IF NOT EXISTS users (
    id char(36) primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null
  );
`;

async function runRawQuery(db) {
  try {
    await db.query(query);
    console.log(`Migration for file: ${currentFileName} done`);
  } catch (error) {
    console.error('Error executing raw SQL query:', error);
  }
}

module.exports = runRawQuery;
