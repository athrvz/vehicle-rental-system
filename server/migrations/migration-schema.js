const path = require('path');
const { db } = require('../db');
const currentFileName = (path.basename(__filename));

const query = `
  CREATE TABLE IF NOT EXISTS migration_schemas (
    id char(36) primary key,
    migration_script_name varchar(255) unique not null
  );
`;

async function initMigrationTracker() {
  try {
    await db.query(query);
    console.log(`Migration for file: ${currentFileName} done`);
  } catch (error) {
    console.error('Error executing raw SQL query:', error);
  }
}

initMigrationTracker();
