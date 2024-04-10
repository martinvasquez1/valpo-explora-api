const asyncHandler = require('express-async-handler');
const Place = require('../models/place');
const { body, validationResult } = require('express-validator');

exports.getPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find().sort({ name: 1 }).exec();
  res.status(200).json({ status: 'success', data: { places } });
});

exports.getPlace = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id).exec();

  if (!place) {
    res.status(404).json({
      status: 'error',
      message: 'Place does not exist.',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { place },
  });
});

exports.createPlace = [
  body('name').trim().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        data: errors,
      });
      return;
    }

    const place = new Place({
      name: req.body.name,
    });

    const newPlace = await place.save();
    res.status(200).json({
      status: 'success',
      data: { place: newPlace },
    });
  }),
];

exports.updatePlace = [
  body('name').trim().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        data: errors,
      });
      return;
    }

    const id = req.params.id;
    const payload = { name: req.body.name };

    const place = await Place.findByIdAndUpdate(id, payload, { new: true });

    if (!place) {
      res.status(404).json({
        status: 'error',
        message: 'Place does not exist.',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { place },
    });
  }),
];

exports.deletePlace = asyncHandler(async (req, res) => {
  const place = await Place.findByIdAndDelete(req.params.id).exec();

  if (!place) {
    res.status(404).json({
      status: 'error',
      message: 'Place does not exist.',
    });
    return;
  }

  res.status(200).json({ status: 'success', data: null });
});
