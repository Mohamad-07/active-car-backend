const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const saleCarRoutes = require('./routes/saleCar');
const auctionCarRoutes = require('./routes/auctionCar');
const authController = require('./controllers/auth');
const cloudinary = require('cloudinary').v2; 
const uploadAuctionRoutes = require('./routes/uploadAuction');
const uploadSaleRoutes = require('./routes/uploadSale');

dotenv.config();

const app = express();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors({
  origin: ['http://localhost:3000','https://activecarspk.com/','https://binakhtar.com/'],
  credentials: true,
}));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/',(req,res)=>{
  res.send("Render Working...")
})
app.post('/api/login', authController.login);

app.use('/api/upload-auction', uploadAuctionRoutes);
app.use('/api/upload-sale', uploadSaleRoutes);

app.use('/api/cars-for-sale', saleCarRoutes);
app.use('/api/cars-for-auction', auctionCarRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
