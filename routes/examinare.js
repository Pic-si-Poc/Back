const express = require('express');
const router = express.Router();
const controller = require('../controllers/examinareController');

router.get('/', controller.getExam);
router.post('/', controller.addExam);

router.post('/start', controller.startExaminare);
router.get('/rezultate', controller.getRezultate);
router.get('/statistici', controller.getStatistici);
router.delete('/:id_exam', controller.deleteExaminare);

module.exports = router;
