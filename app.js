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

dotenv.config();

const app = express();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define allowed origins dynamically
const allowedOrigins = ['http://localhost:3000', 'https://activecarspk.com', 'https://binakhtar.com'];

// Use CORS middleware with a dynamic origin check
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Set body parser limits to handle large requests
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route to test if the server is working
app.get('/', (req, res) => {
  res.send('Render Working...');
});

// Define API routes
app.post('/api/login', authController.login);
app.use('/api/upload-auction', uploadAuctionRoutes);
app.use('/api/upload-sale', uploadSaleRoutes);
app.use('/api/cars-for-sale', saleCarRoutes);
app.use('/api/cars-for-auction', auctionCarRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
