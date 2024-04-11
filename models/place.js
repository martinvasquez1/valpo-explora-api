const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  comuna: { type: Schema.Types.ObjectId, ref: 'Comuna', required: true },
  address: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  type: { type: String, required: true },
  importance: { type: Number },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

module.exports = mongoose.model('Place', PlaceSchema);
