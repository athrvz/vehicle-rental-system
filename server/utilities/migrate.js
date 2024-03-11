const { db } = require('../db');
const fs = require('fs');
const path = require('path');
const contstants = require('./constants');
const MigrationSchema = require('../schema/MigrationSchema');
const MIG_FOLDER = path.join(__dirname, '../migrations');
/*
const modelsDir = path.join(__dirname, '../schema');

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
*/

async function migrate() {
  try {
    const migrationScripts = fs.readdirSync(MIG_FOLDER);

    for (const file of migrationScripts) {
      try {
        // await executeMigration(file);
        const filePath = path.join(MIG_FOLDER, file);
        const queryRunner = require(filePath);
        await queryRunner(db);

      } catch (error) {
        console.log(`Script failed`);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    await db.close();
  }
}

async function executeMigration(file) {
  if (scriptExecutedBefore(file)) {
    console.log(`Skipping migration for ${file}`);
    return;
  }
  const MigSch = await MigrationSchema(db);
  const filePath = path.join(MIG_FOLDER, file);
  const queryRunner = require(filePath);
  await queryRunner(db);
  await MigSch.create({ migration_script_name: file })
}

async function scriptExecutedBefore(fileName) {
  if (fileName === contstants.MIGRATION_SCHEMA_FILE_NAME) {
    return true;
  }
  const MigSch = MigrationSchema(db);
  const executed = await MigSch.findOne({
    where: { migration_script_name: fileName },
    raw: true
  });
  console.log({ file, executed });
  return !!executed;
}

async function foo() {
  const MigSch = MigrationSchema(db);
  await MigSch.create({ migration_script_name: 'filex.js' })
  const x = await MigSch.findOne({ where: { migration_script_name: 'filex.js' }, raw: true });
  console.log({ x });
}

// foo();


migrate();