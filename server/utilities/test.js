const { db } = require('../db');
const UserModel = require('../schema/User');
const VehicleModel = require('../schema/Vehicle');

async function main() {
  const Vehicle = await VehicleModel(db);
  await Vehicle.create({
    type: 'car', variant: 'suv', wheels: 4, registration_number: 'abc 123'
  });
  const x = await Vehicle.findOne();
  console.log(x);
}

main();