const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Create Restaurant
router.post('/', async (req, res) => {
  try {
    const { name, location, cuisine, rating } = req.body;
    const restaurant = new Restaurant({ name, location, cuisine, rating });
    await restaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
