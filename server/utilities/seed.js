const { db } = require('../db');
const UserModel = require('../schema/User');
const VehicleModel = require('../schema/Vehicle');
const MigrationSchModel = require('../schema/MigrationSchema');

async function createMigrationSchema(db, transaction) {
  const query = `
  CREATE TABLE IF NOT EXISTS migration_schemas (
    id char(36) primary key,
    migration_script_name varchar(255) unique not null
  );
`;
  db.query(query, { transaction });
}

const seed = async () => {
  const transaction = await db.transaction();
  try {
    await createMigrationSchema(db, transaction);
    const msch = MigrationSchModel(db);
    await msch.create({
      migration_script_name: 'file.js'
    }, { transaction });
    // const User = UserModel(db);
    // const Vehicle = UserModel(db);
    // await User.create({
    //   firstName: 'Johnny', lastName: 'Doe'
    // }, { transaction });
    await transaction.commit();
    console.log('Seeding completed successfully.');
  } catch (error) {
    await transaction.rollback();
    console.error('Error seeding data:', error);
  } finally {
    await db.close();
  }
};

seed();
