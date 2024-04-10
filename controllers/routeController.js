const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');
const Place = require('../models/place');
const Comuna = require('../models/comuna');

// Thanks <3
// https://stackoverflow.com/q/18883601
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function closestPoint(initialPosition, arrPositions) {
  let closestPoint = { distance: 0 };

  for (let i = 0; i < arrPositions.length; i++) {
    const currentPosition = arrPositions[i];
    const distance = getDistanceFromLatLonInKm(
      initialPosition.lat,
      initialPosition.lng,
      currentPosition.lat,
      currentPosition.lng,
    );
    if (distance > closestPoint.distance) {
      closestPoint = arrPositions[i];
      closestPoint.distance = distance;
    }
  }

  return closestPoint;
}

function calcRoute(initialPosition, arr) {
  const route = [];
  let currentPosition = initialPosition;

  while (arr.length !== 0) {
    const point = closestPoint(currentPosition, arr);
    route.push(point);
    arr = arr.filter((item) => item._id !== point._id);
    currentPosition = point;
  }

  return route;
}

exports.generateRoute = [
  body('comuna').trim().escape(),
  body('time').trim().escape(),
  body('types').trim().escape(),
  check('initialLat').trim().escape(),
  check('initialLng').trim().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        data: errors,
      });
      return;
    }

    const initialPosition = {
      lat: req.body.initialLat,
      lng: req.body.initialLng,
      _id: 0,
    };

    const places = await Place.find({ type: req.body.types }).exec();
    const route = calcRoute(initialPosition, places);
    route.unshift(initialPosition);

    res.status(200).json({
      status: 'success',
      data: { route },
    });
  }),
];
