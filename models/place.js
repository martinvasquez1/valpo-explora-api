const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaceSchema = new Schema({});

module.exports = mongoose.model('Place', PlaceSchema);
