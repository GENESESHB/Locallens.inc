const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
  reelFile: {
    type: String,
    required: true,
  },
  reelType: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Assuming user is a reference to a User model
    ref: 'User',
    required: true, // This makes the user field mandatory
  },
  // Add any other fields needed here
});

const Reel = mongoose.model('Reel', reelSchema);
module.exports = Reel;
