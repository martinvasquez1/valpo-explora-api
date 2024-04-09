const express = require('express');
const router = express.Router();
const placeRouter = require('./place');
const comunaRouter = require('./comuna');

router.use('/places', placeRouter);
router.use('/comunas', comunaRouter);

module.exports = router;
