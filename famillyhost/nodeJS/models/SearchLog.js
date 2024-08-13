// models/SearchLog.js
const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema({
  keyword: String,
  userIp: String,
  timestamp: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  // Add other fields as needed
});

module.exports = mongoose.model('SearchLog', searchLogSchema);
