const { db } = require('../db');
const fs = require('fs');
const path = require('path');

// Define the directory containing model schema files
const modelsDir = path.join(__dirname, '../schema');

// Define the migration function
const migrate = async () => {
  try {
    // Get all files in the models directory
    const modelFiles = fs.readdirSync(modelsDir);

    // Iterate over each file
    for (const file of modelFiles) {
      const modelSchema = require(path.join(modelsDir, file));

      const Model = modelSchema(db);

      await Model.sync({ force: true }); // This will create the table if it doesn't exist (or drop and recreate if it does) - Use with caution in production!

      console.log(`${file.replace('.js', '')} table created successfully.`);
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await db.close();
  }
};


migrate();