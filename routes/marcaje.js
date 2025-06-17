const express = require('express');
const router = express.Router();
const controller = require('../controllers/marcajeController');

router.post('/', controller.addMarcaj);
router.get('/:id_exam', controller.getMarcaje);

module.exports = router;
