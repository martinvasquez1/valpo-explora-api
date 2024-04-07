const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Place', PlaceSchema);
