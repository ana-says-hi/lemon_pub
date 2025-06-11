const express = require('express');
const router = express.Router();
const controller = require('../controllers/bidsController');

router.get('/', controller.getAllBids);
router.get('/:email', controller.getBidsByUser);
router.post('/', controller.createBid);
router.put('/:id', controller.updateBid);

module.exports = router;
