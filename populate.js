#! /usr/bin/env node

const mongoose = require('mongoose');
const Place = require('./models/place');
const Comuna = require('./models/comuna');

require('dotenv').config();

const places = [];
const comunas = [];

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;

async function comunaCreate(index, data) {
  const comuna = new Comuna(data);
  await comuna.save();
  comunas[index] = comuna;
  console.log(`Added comuna: ${data.name}`);
}

async function placeCreate(index, data) {
  const place = new Place(data);
  await place.save();
  places[index] = place;
  console.log(`Added place: ${data.name}`);
}

async function createComunas() {
  console.log('Adding comunas');
  await Promise.all([
    comunaCreate(0, { name: 'Comuna 100' }),
    comunaCreate(1, { name: 'Comuna 101' }),
  ]);
}

async function createPlaces() {
  console.log('Adding places');
  await Promise.all([
    placeCreate(0, { name: 'Place 100', comuna: comunas[0] }),
    placeCreate(1, { name: 'Place 101', comuna: comunas[0] }),
    placeCreate(2, { name: 'Place 102', comuna: comunas[1] }),
    placeCreate(3, { name: 'Place 103', comuna: comunas[1] }),
  ]);
}

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);

  await createComunas();
  await createPlaces();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}
