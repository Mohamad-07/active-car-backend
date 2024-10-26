const auctionCar = require("../models/auctionCar"); 
const cloudinary = require("cloudinary").v2;

exports.uploadImagesAuction = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(200).json({ images: [] }); 
    }

    console.log("Files being uploaded:", req.files); 

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "auction_car_images" },
          (error, result) => {
            if (error) return reject(error);
            console.log("Uploaded image URL:", result.secure_url);
            resolve(result.secure_url);
          }
        ).end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);
    res.status(200).json({ images: imageUrls });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Failed to upload images", error });
  }
};

exports.getAllAuctionCars = async (req, res) => {
  try {
    const cars = await auctionCar.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the auction cars",
      error: error.message,
    });
  }
};

exports.getAuctionCarById = async (req, res) => {
  try {
    const car = await auctionCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Auction Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the auction car",
      error: error.message,
    });
  }
};

exports.createAuctionCar = async (req, res) => {
  try {
    const carDetails = {
      ...req.body,
      basic: typeof req.body.basic === "string" ? JSON.parse(req.body.basic) : req.body.basic,
      damage: typeof req.body.damage === "string" ? JSON.parse(req.body.damage) : req.body.damage,
    };

    const newCar = new auctionCar(carDetails);
    const savedCar = await newCar.save();
    res.status(201).json({ message: "Auction Car created successfully!", car: savedCar });
  } catch (error) {
    console.error("Error creating auction car:", error);
    res.status(500).json({
      message: "An error occurred while creating the auction car",
      error: error.message,
    });
  }
};

exports.updateAuctionCar = async (req, res) => {
  try {
    const carDetails = {
      ...req.body,
      basic: typeof req.body.basic === "string" ? JSON.parse(req.body.basic) : req.body.basic,
      damage: typeof req.body.damage === "string" ? JSON.parse(req.body.damage) : req.body.damage,
    };

    let images = req.body.images || [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "auction_car_images" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          ).end(file.buffer);
        });
      });
      images = await Promise.all(uploadPromises);
    }

    const updatedCar = await auctionCar.findByIdAndUpdate(
      req.params.id,
      { ...carDetails, images },
      { new: true, omitUndefined: true } 
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Auction Car not found" });
    }

    res.status(200).json({
      message: "Auction Car updated successfully!",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Error updating auction car:", error);
    res.status(500).json({
      message: "An error occurred while updating the auction car",
      error: error.message,
    });
  }
};
exports.deleteAuctionCar = async (req, res) => {
  try {
    const deletedCar = await auctionCar.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Auction Car not found" });
    }
    res.status(200).json({ message: "Auction Car deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the auction car",
      error: error.message,
    });
  }
};
