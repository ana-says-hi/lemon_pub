const express = require('express');
const router = express.Router();
const controller = require('../controllers/userFilesController');

router.get('/', controller.getAllFiles);
router.get('/:email', controller.getFilesByEmail);
router.post('/', controller.createFile);
// router.post('/', (req, res, next) => {
//   console.log('Request body in route:', req.body);
//   next();
// }, controller.createFile);

module.exports = router;
