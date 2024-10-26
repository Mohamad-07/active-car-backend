const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const saleCarRoutes = require("./routes/saleCar");
const transitCarRoutes = require("./routes/transitCar");
const auctionCarRoutes = require("./routes/auctionCar");
const authController = require("./controllers/auth");
const cloudinary = require("cloudinary").v2;
const uploadAuctionRoutes = require("./routes/uploadAuction");
const uploadSaleRoutes = require("./routes/uploadSale");
const uploadTransitRoutes = require("./routes/uploadTransit");

dotenv.config();

const app = express();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedOrigins = [
  "http://localhost:3000",
  "https://activecarspk.com",
  "https://binakhtar.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Connected...");
});
app.post("/api/login", authController.login);

app.use("/api/upload-auction", uploadAuctionRoutes);
app.use("/api/upload-sale", uploadSaleRoutes);
app.use("/api/upload-transit", uploadTransitRoutes);

app.use("/api/cars-for-sale", saleCarRoutes);
app.use("/api/cars-for-transit", transitCarRoutes);
app.use("/api/cars-for-auction", auctionCarRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
