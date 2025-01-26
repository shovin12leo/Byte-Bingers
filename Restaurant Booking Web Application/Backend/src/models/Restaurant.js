const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cuisines: { type: [String], required: true },
  rating: { type: Number, default: 0 },
  tablesAvailable: { type: Number, default: 0 },
  image: { type: String },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
