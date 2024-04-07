const express = require('express');
const router = express.Router();
const placeRouter = require('./place');

router.use('/places', placeRouter);

module.exports = router;
