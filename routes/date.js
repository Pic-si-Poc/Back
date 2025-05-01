const express = require('express');
const router = express.Router();
const controller = require('../controllers/dateController');

router.get('/', controller.getDate);
router.post('/', controller.addDate);

module.exports = router;
