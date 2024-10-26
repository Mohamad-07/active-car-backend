const express = require('express');
const { uploadImagesAuction } = require('../controllers/auctionCar');
const upload = require('../multerConfig');
const router = express.Router();

router.post('/', upload.array('images', 30), uploadImagesAuction);

module.exports = router;
