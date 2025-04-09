const express = require('express');
const router = express.Router();
const controller = require('../controllers/userFilesController');

router.get('/', controller.getAllFiles);
router.get('/:email', controller.getFilesByEmail);
router.post('/', controller.createFile);

module.exports = router;
