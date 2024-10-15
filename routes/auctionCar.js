const express = require('express');
const {
  createAuctionCar,
  getAllAuctionCars,
  getAuctionCarById,
  updateAuctionCar,
  deleteAuctionCar,
  uploadImagesAuction
} = require("../controllers/auctionCar");
const upload = require('../multerConfig');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/upload', upload.array('images', 30), uploadImagesAuction);
router.post('/', verifyToken, upload.array('images', 30), createAuctionCar);
router.get('/', getAllAuctionCars);
router.get('/:id', getAuctionCarById);
router.put('/:id', verifyToken, upload.array('images', 30), updateAuctionCar);
router.delete('/:id', verifyToken, deleteAuctionCar);

module.exports = router;
