const express = require('express');
const router = express.Router();
const controller = require('../controllers/testController');

router.get('/', controller.getTeste);
router.post('/', controller.addTest);

module.exports = router;
