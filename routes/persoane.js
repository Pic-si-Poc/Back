const express = require('express');
const router = express.Router();
const controller = require('../controllers/persoaneController');

router.get('/', controller.getPersoane);
router.post('/', controller.addPersoana);
router.put('/:id', controller.updatePersoana);
router.delete('/:id', controller.deletePersoana);

module.exports = router;
