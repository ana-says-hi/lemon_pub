const express = require('express');
const router = express.Router();
const controller = require('../controllers/bidsController');

router.get('/', controller.getAllBids);
router.get('/:email', controller.getBidByUser);
router.post('/', controller.createBid);
