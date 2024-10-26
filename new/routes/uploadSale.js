const express = require('express');
const { uploadImagesSale } = require('../controllers/saleCar');
const upload = require('../multerConfig');
const router = express.Router();

router.post('/', upload.array('images', 30), uploadImagesSale);

module.exports = router;
