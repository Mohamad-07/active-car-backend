const mongoose = require("mongoose");

const saleCarSchema = new mongoose.Schema({
  images: [{ type: String }],
  name: { type: String, required: true },
  price: { type: String, required: true },
  isSold: { type: Boolean, default: false },
  details: {
    make: { type: String },
    displacement: { type: String },
    model: { type: String },
    type: { type: String },
    registration: { type: String },
    fuel: { type: String },
    grade: { type: String },
    color: { type: String },
    transmission: { type: String },
    mileage: { type: String },
  },
  options: {
    ps: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    pw: { type: Boolean, default: false },
    sunroof: { type: Boolean, default: false },
    navi: { type: Boolean, default: false },
    warrantyBook: { type: Boolean, default: false },
  },
  exteriorCondition: {
    frontBumper: { type: String },
    bonnet: { type: String },
    leftFrontFender: { type: String },
    leftFrontDoor: { type: String },
    leftRearDoor: { type: String },
    roof: { type: String },
    trunk: { type: String },
    rightFrontFender: { type: String },
    rightRearFender: { type: String },
    rightFrontDoor: { type: String },
    rightRearDoor: { type: String },
  },
  note: { type: String },
});

const SaleCar = mongoose.model("SaleCar", saleCarSchema);
module.exports = SaleCar;
