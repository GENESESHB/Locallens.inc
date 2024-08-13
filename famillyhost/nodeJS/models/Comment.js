// models/Comment.js

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  image: { type: String } // Path to image if uploaded
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
