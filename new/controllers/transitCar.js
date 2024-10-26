const TransitCar = require("../models/transitCar");
const cloudinary = require("cloudinary").v2;

exports.uploadImagesTransit = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(200).json({ images: [] });
    }
    console.log("Files being uploaded:", req.files);
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "transit_car_images" }, (error, result) => {
            if (error) return reject(error);
            console.log("Uploaded image URL:", result.secure_url);
            resolve(result.secure_url);
          })
          .end(file.buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);
    res.status(200).json({ images: imageUrls });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Failed to upload images", error });
  }
};

exports.getAllTransitCars = async (req, res) => {
  try {
    const cars = await TransitCar.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the Transit cars",
      error: error.message,
    });
  }
};

exports.getTransitCarById = async (req, res) => {
  try {
    const car = await TransitCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Transit Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the transit car",
      error: error.message,
    });
  }
};

exports.createTransitCar = async (req, res) => {
  try {
    const carDetails = {
      ...req.body,
      details: JSON.parse(req.body.details || '{}'),
      options: JSON.parse(req.body.options || '{}'),
      exteriorCondition: JSON.parse(req.body.exteriorCondition || '{}'),
    };

    const newCar = new TransitCar(carDetails);
    const savedCar = await newCar.save();
    res
      .status(201)
      .json({ message: "Transit Car created successfully!", car: savedCar });
  } catch (error) {
    console.error("Error creating Transit  car:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while creating the Transit car",
        error,
      });
  }
};

exports.updateTransitCar = async (req, res) => {
  try {
    const carDetails = {
      ...req.body,
      details: JSON.parse(req.body.details || '{}'),
      options: JSON.parse(req.body.options || '{}'),
      exteriorCondition: JSON.parse(req.body.exteriorCondition || '{}'),
    };

    const updatedCar = await TransitCar.findByIdAndUpdate(
      req.params.id,
      carDetails,
      { new: true, omitUndefined: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Transit Car not found" });
    }

    res
      .status(200)
      .json({ message: "Transit Car updated successfully!", car: updatedCar });
  } catch (error) {
    console.error("Error updating Transit car:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating the Transit car",
        error,
      });
  }
};

exports.deleteTransitCar = async (req, res) => {
  try {
    const deletedCar = await TransitCar.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Transit Car not found" });
    }
    res.status(200).json({ message: "Transit Car deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the Transit car",
      error: error.message,
    });
  }
};
