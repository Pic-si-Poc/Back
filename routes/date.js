const express = require('express');
const router = express.Router();
const controller = require('../controllers/dateController');

// POST: Adaugă date fiziologice live
router.post('/', controller.addDate);

// GET: (opțional) toate datele – pentru testare/debug
router.get('/', controller.getDate);

module.exports = router;
