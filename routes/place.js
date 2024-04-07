const express = require('express');
const router = express.Router();
const controller = require('../controllers/placeController');

router.get('/', controller.getPlaces);
router.get('/:id', controller.getPlace);
router.post('/', controller.createPlace);
router.put('/:id', controller.updatePlace);
router.delete('/:id', controller.deletePlace);

module.exports = router;
