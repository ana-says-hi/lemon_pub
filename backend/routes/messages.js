const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.get('/', (req, res) => {
  res.send('Messages API is working');
});
module.exports = router;
