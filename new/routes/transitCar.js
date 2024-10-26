const express = require('express');
const {
  createTransitCar,
  getAllTransitCars,
  getTransitCarById,
  updateTransitCar,
  deleteTransitCar,
  uploadImagesTransit,
} = require('../controllers/transitCar');
const router = express.Router();
const upload = require('../multerConfig');
const verifyToken = require('../middleware/authMiddleware');

router.post('/upload', upload.array('images', 30), uploadImagesTransit);
router.post('/', verifyToken, upload.array('images', 30), createTransitCar);
router.get('/', getAllTransitCars);
router.get('/:id', getTransitCarById);
router.put('/:id', verifyToken, upload.array('images', 30), updateTransitCar);
router.delete('/:id', verifyToken, deleteTransitCar);

module.exports = router;
