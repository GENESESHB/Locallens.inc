// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  city: { type: String, required: true },
  profilePicture: String, // URL to profile picture
  coverPhoto: String,
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  isPhoneVerified: { type: Boolean, default: false },
  phoneVerificationCode: { type: String }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
