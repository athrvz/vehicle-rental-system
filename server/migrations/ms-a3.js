const path = require('path');

const currentFileName = (path.basename(__filename));

const query = `
  CREATE TABLE IF NOT EXISTS rentals (
    id CHAR(36) PRIMARY KEY,
    userId CHAR(36) NOT NULL,
    vehicleId CHAR(36) NOT NULL,
    from_date DATE,
    to_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicleId) REFERENCES vehicles(id) ON DELETE CASCADE
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
