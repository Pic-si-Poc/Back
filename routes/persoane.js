const express = require('express');
const router = express.Router();
const persoaneController = require('../controllers/persoaneController');

// Rute
router.get('/', persoaneController.getPersoane);
router.post('/', persoaneController.addPersoana);

module.exports = router;
