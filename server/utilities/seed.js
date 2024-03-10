const { db } = require('../db');
const UserModel = require('../schema/User');

const seed = async () => {
  const transaction = await db.transaction();
  try {
    const User = UserModel(db);
    await User.create({
      firstName: 'John', lastName: 'Doe'
    }, { transaction, raw: true });

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
