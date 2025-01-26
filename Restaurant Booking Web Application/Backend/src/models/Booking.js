const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  status: { type: String, default: "Confirmed" },
});

module.exports = mongoose.model("Booking", bookingSchema);
