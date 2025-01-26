const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const transporter = require("../config/email");

router.post("/", async (req, res) => {
  try {
    const { userId, restaurantId, date, time, guests, email } = req.body;

    const booking = new Booking({ userId, restaurantId, date, time, guests });
    await booking.save();

    // Send email confirmation
    const mailOptions = {
      from:"shovinmicheldavid1285@gmail.com",
      to: email,
      subject: "Booking Confirmation",
      text: `Your table for ${guests} people has been booked at ${time} on ${date}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
        return res.status(500).json({ message: "Booking successful, but email failed." });
      }
      res.status(201).json({ message: "Table booked successfully! Confirmation email sent." });
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
