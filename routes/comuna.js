const express = require('express');
const router = express.Router();
const controller = require('../controllers/comunaController');

router.get('/', controller.getComunas);
router.get('/:id', controller.getComuna);
router.post('/', controller.createComuna);
router.put('/:id', controller.updateComuna);
router.delete('/:id', controller.deleteComuna);

module.exports = router;
