const path = require('path');

const currentFileName = (path.basename(__filename));

const query = `
  CREATE TABLE IF NOT EXISTS vehicles (
    id char(36) primary key,
    type varchar(255) not null,
    variant varchar(255) not null,
    wheels integer not null,
    registration_number varchar(255) not null
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
