const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Get reviews for a restaurant
router.get("/:restaurantId", async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a review
router.post("/", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:restaurantId", async (req, res) => {
    try {
      const reviews = await Review.find({ restaurantId: req.params.restaurantId }).populate("userId", "name");
      res.json(reviews);
    } catch (error) {
      console.error("Get Reviews Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;
