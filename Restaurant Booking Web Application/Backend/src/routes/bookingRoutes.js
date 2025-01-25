const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Create Booking
router.post('/', async (req, res) => {
  try {
    const { userId, restaurantId, date, guests } = req.body;
    const booking = new Booking({ userId, restaurantId, date, guests });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('restaurantId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
