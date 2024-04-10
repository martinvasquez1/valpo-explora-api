#! /usr/bin/env node

const mongoose = require('mongoose');
const Place = require('./models/place');
const Comuna = require('./models/comuna');

require('dotenv').config();

const places = [];
const comunas = [];

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

async function comunaCreate(index, data) {
  const comuna = new Comuna(data);
  await comuna.save();
  comunas[index] = comuna;
  console.log(`Added comuna: ${data.name}`);
}

async function placeCreate(index, data) {
  data.description = lorem;
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
    placeCreate(0, {
      name: 'Place 100',
      comuna: comunas[0],
      type: 'art',
      lat: -33.028850620709505,
      lng: -71.64729596032845,
      imageUrl:
        'https://images.unsplash.com/photo-1544023920-93dd2bd912e0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }),
    placeCreate(1, {
      name: 'Place 101',
      comuna: comunas[0],
      type: 'art',
      lat: -33.02921042059679,
      lng: -71.64291631350062,
      imageUrl:
        'https://images.unsplash.com/photo-1586461827441-b4cf43af68ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }),
    placeCreate(2, {
      name: 'Place 102',
      comuna: comunas[0],
      type: 'art',
      lat: -33.02719552230843,
      lng: -71.63993553150486,
      imageUrl:
        'https://images.unsplash.com/photo-1601311854011-376bc4f1f19b?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }),
    placeCreate(3, {
      name: 'Place 103',
      comuna: comunas[0],
      type: 'museum',
      lat: -33.029876046515824,
      lng: -71.63804769515993,
      imageUrl:
        'https://images.unsplash.com/photo-1552686637-83c59eba15f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }),
    placeCreate(4, {
      name: 'Place 104',
      comuna: comunas[1],
      type: 'museum',
      lat: -33.031423157607165,
      lng: -71.63646045725379,
      imageUrl:
        'https://images.unsplash.com/photo-1561324933-111547d38127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }),
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
