const express = require('express');
const router = express.Router();
const { saveAiSample } = require('../controllers/aiController');

router.post('/ai-sample', saveAiSample);

module.exports = router;
