// service.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  profilePicture: { type: String },
  stateName: { type: String },
  stateImage: { type: String },
  cityName: { type: String },
  cityImage: { type: String },
  architectHomeName: { type: String },
  architectHomeImage: { type: String },
  eatName: { type: String },
  eatImages: { type: [String] },
  moroccanDecorationName: { type: String },
  moroccanDecorationImages: { type: [String] },
  clothingName: { type: String },
  clothingImages: { type: [String] },
});

module.exports = mongoose.model('Service', serviceSchema);
