const { db } = require('../db');
const UserModel = require('../schema/User');
const VehicleModel = require('../schema/Vehicle');
// const MigrationSchModel = require('../schema/MigrationSchema');

// async function createMigrationSchema(db, transaction) {
//   const query = `
//   CREATE TABLE IF NOT EXISTS migration_schemas (
//     id char(36) primary key,
//     migration_script_name varchar(255) unique not null
//   );
// `;
//   db.query(query, { transaction });
// }

const seed = async () => {
  const transaction = await db.transaction();
  try {
    // await createMigrationSchema(db, transaction);

    const User = UserModel(db);
    await User.create({
      first_name: 'Johnny', last_name: 'Doe'
    }, { transaction });

    const Vehicle = VehicleModel(db);
    await Vehicle.bulkCreate([
      { type: 'car', variant: 'suv', wheels: 4, registration_number: 'abc 123' },
      { type: 'car', variant: 'sedan', wheels: 4, registration_number: 'abc 124' },
      { type: 'bike', variant: 'sports', wheels: 2, registration_number: 'abc 125' },
      { type: 'bike', variant: 'moped', wheels: 2, registration_number: 'abc 135' }
    ], { transaction });

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
