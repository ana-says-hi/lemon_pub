const express = require('express');
const router = express.Router();
const controller = require('../controllers/peepsController');

router.get('/', controller.getAllPeeps);
router.post('/', controller.createPeep);
router.get('/:email', controller.getPeepByEmail);
router.put('/:id', controller.updatePeep);
router.delete('/:id', controller.deletePeep);

module.exports = router;
