const express = require('express');
const {
  createSaleCar,
  getAllSaleCars,
  getSaleCarById,
  updateSaleCar,
  deleteSaleCar,
  uploadImagesSale,
} = require('../controllers/saleCar');
const router = express.Router();
const upload = require('../multerConfig');
const verifyToken = require('../middleware/authMiddleware');

router.post('/upload', upload.array('images', 30), uploadImagesSale);
router.post('/', verifyToken, upload.array('images', 30), createSaleCar);
router.get('/', getAllSaleCars);
router.get('/:id', getSaleCarById);
router.put('/:id', verifyToken, upload.array('images', 30), updateSaleCar);
router.delete('/:id', verifyToken, deleteSaleCar);

module.exports = router;
