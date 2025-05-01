const express = require('express');
const router = express.Router();
const controller = require('../controllers/intrebariController');

router.get('/', controller.getIntrebari);
router.post('/', controller.addIntrebare);

module.exports = router;
