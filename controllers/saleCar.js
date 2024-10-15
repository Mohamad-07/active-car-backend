const SaleCar = require('../models/saleCar'); 
const cloudinary = require('cloudinary').v2;

exports.uploadImagesSale = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(200).json({ images: [] }); 
    }
    console.log("Files being uploaded:", req.files); 
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "sale_car_images" }, 
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

exports.getAllSaleCars = async (req, res) => {
  try {
    const cars = await SaleCar.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the Sale cars",
      error: error.message,
    });
  }
};

exports.getSaleCarById = async (req, res) => {
  try {
    const car = await SaleCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Sale Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the sale car",
      error: error.message,
    });
  }
};

exports.createSaleCar = async (req, res) => {
  try {
    const carDetails = {
      ...req.body,
      details: typeof req.body.details === "string" ? JSON.parse(req.body.details) : req.body.details,
      options: typeof req.body.options === "string" ? JSON.parse(req.body.options) : req.body.options,
      exteriorCondition: typeof req.body.exteriorCondition === "string" ? JSON.parse(req.body.exteriorCondition) : req.body.exteriorCondition,
    };

    const newCar = new SaleCar(carDetails);
    const savedCar = await newCar.save();
    res.status(201).json({ message: "Sale Car created successfully!", car: savedCar });
  } catch (error) {
    console.error("Error creating Sale car:", error);
    res.status(500).json({
      message: "An error occurred while creating the Sale car",
      error: error.message,
    });
  }
};

exports.updateSaleCar = async (req, res) => {
  try {
    const carDetails = {
      ...req.body,
      details: typeof req.body.details === "string" ? JSON.parse(req.body.details) : req.body.details,
      options: typeof req.body.options === "string" ? JSON.parse(req.body.options) : req.body.options,
      exteriorCondition: typeof req.body.exteriorCondition === "string" ? JSON.parse(req.body.exteriorCondition) : req.body.exteriorCondition,
    };

    let images = req.body.images || []; 

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "sale_car_images" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          ).end(file.buffer);
        });
      });
      images = await Promise.all(uploadPromises);
    }

    const updatedCar = await SaleCar.findByIdAndUpdate(
      req.params.id,
      { ...carDetails, images },
      { new: true, omitUndefined: true } 
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Sale Car not found" });
    }

    res.status(200).json({
      message: "Sale Car updated successfully!",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Error updating Sale car:", error);
    res.status(500).json({
      message: "An error occurred while updating the Sale car",
      error: error.message,
    });
  }
};

exports.deleteSaleCar = async (req, res) => {
  try {
    const deletedCar = await SaleCar.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Sale Car not found" });
    }
    res.status(200).json({ message: "Sale Car deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the Sale car",
      error: error.message,
    });
  }
};

