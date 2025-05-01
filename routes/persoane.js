const express = require('express');
const router = express.Router();
const controller = require('../controllers/persoaneController');

router.get('/', controller.getPersoane);
router.post('/', controller.addPersoana);

module.exports = router;
