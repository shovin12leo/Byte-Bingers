const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new restaurant (Admin)
router.post("/", async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.json(newRestaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
