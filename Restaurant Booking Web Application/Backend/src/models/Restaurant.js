const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cuisine: { type: String, required: true },
  availability: { type: Boolean, default: true }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant; // ✅ Ensure this is correctly exported
