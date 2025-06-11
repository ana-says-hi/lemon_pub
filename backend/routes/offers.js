const express = require('express');
const router = express.Router();
const controller = require('../controllers/offersController');

router.get('/', controller.getAllOffers);
router.get('/:email', controller.getOfferByUser);
router.post('/', controller.createOffer);
router.put('/:id', controller.updateOffer);

module.exports = router;
