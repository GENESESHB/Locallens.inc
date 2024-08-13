const mongoose = require('mongoose');

// Define the schema for Booking
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  service: {
    type: {
      stateName: String,
      stateImage: String,
      cityName: String,
      cityImage: String,
      architectHomeName: String,
      architectHomeImage: String,
      moroccanDecorationName: String,
      moroccanDecorationImages: [String],
      eatName: String,
      eatImages: [String],
      clothingName: String,
      clothingImages: [String],
    },
    required: true
  },
  user: {
    type: {
      userName: String,
      profilePicture: String,
      fullName: String,
      email: String,
      phoneNumber: String
    },
    required: true
  }
});

// Create and export the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

