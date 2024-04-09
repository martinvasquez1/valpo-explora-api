const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  comuna: { type: Schema.Types.ObjectId, ref: 'Comuna', required: true },
  description: { type: String },
  imageUrl: { type: String },
  type: { type: String },
  importance: { type: Number },
  lat: { type: Number },
  lng: { type: Number },
});

module.exports = mongoose.model('Place', PlaceSchema);
