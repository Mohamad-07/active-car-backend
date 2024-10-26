const express = require('express');
const { uploadImagesTransit } = require('../controllers/transitCar');
const upload = require('../multerConfig');
const router = express.Router();

router.post('/', upload.array('images', 30), uploadImagesTransit);

module.exports = router;
