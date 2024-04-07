const express = require('express');
const router = express.Router();
const placeRouter = require('./place');

router.use('/place', placeRouter);

module.exports = router;
