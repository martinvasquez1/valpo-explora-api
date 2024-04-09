const mongoose = require('mongoose');

const { Schema } = mongoose;

const ComunaSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  lat: { type: Number },
  lng: { type: Number },
});

module.exports = mongoose.model('Comuna', ComunaSchema);
