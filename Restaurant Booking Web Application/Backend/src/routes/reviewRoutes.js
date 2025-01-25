const express = require("express");
const router = express.Router();
const Review = require("../models/review");


// ✅ Submit a Review
router.post("/add", async (req, res) => {
    try {
        const { restaurantId, userId, rating, comment } = req.body;

        if (!restaurantId || !userId || !rating || !comment) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newReview = new Review({ restaurantId, userId, rating, comment });
        await newReview.save();
        res.status(201).json({ message: "Review submitted successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Get Reviews for a Restaurant
router.get("/:restaurantId", async (req, res) => {
    try {
        const reviews = await Review.find({ restaurantId: req.params.restaurantId }).populate("userId", "name");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Filter Restaurants by Average Rating (Optional)
router.get("/filter/by-rating", async (req, res) => {
    try {
        const { minRating } = req.query;
        const min = parseFloat(minRating) || 0;

        const restaurants = await Review.aggregate([
            { $group: { _id: "$restaurantId", avgRating: { $avg: "$rating" } } },
            { $match: { avgRating: { $gte: min } } },
            { $sort: { avgRating: -1 } }
        ]);

        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
