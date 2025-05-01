const express = require('express');
const router = express.Router();
const controller = require('../controllers/utilizatoriController');

router.get('/', controller.getUtilizatori);
router.post('/', controller.addUtilizator);

module.exports = router;
