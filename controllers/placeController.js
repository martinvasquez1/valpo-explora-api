const asyncHandler = require('express-async-handler');
const Place = require('../models/place');
const { body, validationResult } = require('express-validator');

exports.getPlaces = asyncHandler(async (req, res) => {});

exports.getPlace = asyncHandler(async (req, res) => {});

exports.createPlace = [asyncHandler(async (req, res) => {})];

exports.updatePlace = [asyncHandler(async (req, res) => {})];

exports.deletePlace = asyncHandler(async (req, res) => {});
