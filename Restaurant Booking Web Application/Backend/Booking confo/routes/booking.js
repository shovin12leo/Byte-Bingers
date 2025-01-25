const express = require('express');
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking'); // Importing from the correct file
const router = express.Router();

// Setup Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use another email service
  auth: {
    user: 'shovinmicheldavid1285@gmail.com', // Your email address
    pass: 'gzab novj wbyk vmyd',  // Your email password or app password
  },
});

// Route to create a new booking
router.post('/book', async (req, res) => {
  const { name, email, date, time, guests } = req.body;

  try {
    // Save the booking in MongoDB
    const booking = new Booking({
      name,
      email,
      date,
      time,
      guests,
    });

    await booking.save();

    // Send email confirmation
    const mailOptions = {
      from: 'shovinmicheldavid1285@gmail.com',
      to: email,
      subject: 'Booking Confirmation',
      text: `Dear ${name},\n\nYour table has been booked for ${guests} guests on ${date} at ${time}.\n\nThank you for choosing us!`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Booking confirmed, check your email!' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

module.exports = router;
