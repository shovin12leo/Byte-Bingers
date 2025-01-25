const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant'); // ✅ Import the model

// Create a new restaurant
router.post('/add', async (req, res) => {
  try {
    const { name, location, cuisine, availability } = req.body;
    const newRestaurant = new Restaurant({ name, location, cuisine, availability });
    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    res.status(500).json({ message: 'Error adding restaurant', error: error.message });
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
});

// Update a restaurant
router.put('/update/:id', async (req, res) => {
  try {
    const { name, location, cuisine, availability } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, location, cuisine, availability },
      { new: true }
    );
    res.status(200).json({ message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant', error: error.message });
  }
});

// Delete a restaurant
router.delete('/delete/:id', async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant', error: error.message });
  }
});

module.exports = router; // ✅ Export only once
