const express = require('express');
const router = express.Router();
const controller = require('../controllers/tokenController');

router.get('/:email', controller.getUserToken);

module.exports = router;
