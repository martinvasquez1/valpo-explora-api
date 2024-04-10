const express = require('express');
const router = express.Router();
const placeRouter = require('./place');
const comunaRouter = require('./comuna');
const routeRouter = require('./route');

router.use('/places', placeRouter);
router.use('/comunas', comunaRouter);
router.use('/routes', routeRouter);

module.exports = router;
