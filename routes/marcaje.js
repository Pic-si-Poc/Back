const express = require('express');
const router = express.Router();
const controller = require('../controllers/marcajeController');

router.get('/', controller.getMarcaje);
router.post('/', controller.addMarcaj);

module.exports = router;
