const express = require('express');
const { db } = require('../db');
const { Op } = require('sequelize');
const UserModel = require('../schema/User');
const VehicleModel = require('../schema/Vehicle');
const RentalModel = require('../schema/Rental');
const router = express.Router();

// Models
const User = UserModel(db);
const Vehicle = VehicleModel(db);
const Rental = RentalModel(db);

router.post('/', (req, res) => {
  console.log({ body: req.body });
  return res.send('ok');
});

// Users route
router.post('/user', async (req, res) => {
  const { firstName: first_name, lastName: last_name } = req.body;

  try {
    const existing = await User.findOne({
      where: { first_name, last_name },
      raw: true
    });
    if (existing) {
      return res.status(200).send({
        user: existing,
        message: 'Users already registered, Proceeding'
      });
    }

    const user = await User.create({
      first_name, last_name
    });
    res.status(200).send({
      user,
      message: 'User added successfully'
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({
      message: `Something went wrong !`
    });
  }
});

// Select wheels
router.post('/wheels', async (req, res) => {
  const { wheels } = req.body;
  try {
    const vehicleList = await Vehicle.findAll({
      where: { wheels },
      raw: true
    });
    const response = { items: [] };
    vehicleList.map(item => {
      response.items.push({
        id: item.id,
        type: item.type,
        variant: item.variant,
        registrationNumber: item.registration_number
      });
    });
    return res.status(200).send(response);
  } catch (error) {
    console.log({ error });
    return res.status(500).send({
      message: `Something went wrong !`
    });
  }
});

// Booking
router.post('/book', async (req, res) => {
  const { vehicleId, fromDate, toDate, userId } = req.body;
  try {
    if (isAlreadyBooked(vehicleId, fromDate, toDate)) {
      return res.status(200).send({
        booked: false,
        message: 'Selected vechicle already booked for the period, Please book another one.'
      });
    }

    const booking = await Rental.create({
      vehicleId, fromDate, toDate, userId
    });
    return res.status(200).send({
      booked: true,
      bookingDetails: booking,
      message: 'Selected vehicle booked successfully !'
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({
      message: `Something went wrong !`
    });
  }
});

async function isAlreadyBooked(vehicleId, fromDate, toDate) {
  const bookings = await Rental.findOne({
    where: {
      vehicleId,
      fromDate: { [Op.gte]: fromDate },
      toDate: { [Op.lte]: toDate }
    },
    raw: true
  });
  return !!bookings;
}

module.exports = router;