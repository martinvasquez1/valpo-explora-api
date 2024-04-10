const express = require('express');
const router = express.Router();
const controller = require('../controllers/routeController');

router.post('/', controller.generateRoute);

module.exports = router;
