const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  profilePicture: { type: String },
  stateName: { type: String },
  stateImage: { type: String },
  cityName: { type: String },
  cityImage: { type: String },
  architectHomeName: { type: String },
  architectHomeImage: { type: String },
  eatName: { type: String },
  eatImages: [String],
  moroccanDecorationName: { type: String },
  moroccanDecorationImages: [String],
  clothingName: { type: String },
  clothingImages: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create a text index on relevant fields
serviceSchema.index({
  stateName: 'text',
  cityName: 'text',
  architectHomeName: 'text',
  eatName: 'text',
  moroccanDecorationName: 'text',
  clothingName: 'text'
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
