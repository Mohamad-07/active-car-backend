const mongoose = require('mongoose');

const saleCarSchema = new mongoose.Schema({
  images: [{ type: String, }],
  name: { type: String, required: true },
  price: { type: String, required: true },
  details: {
    make: { type: String },
    model: { type: String },
    type: { type: String },
    registration: { type: String },
    displacement: { type: String },
    color: { type: String, },
    transmission: { type: String },
    mileage: { type: String },
  },
  options: {
    ps: { type: String },
    seats: { type: String },
    tv: { type: String },
    maintenanceNote: { type: String },
    pw: { type: String },
    sunroof: { type: String },
    navi: { type: String },
    warrantyBook: { type: String },
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

const SaleCar = mongoose.model('SaleCar', saleCarSchema);
module.exports = SaleCar;
