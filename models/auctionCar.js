const mongoose = require('mongoose');

const auctionCarSchema = new mongoose.Schema({
    images: [{ type: String }],
    name: { type: String, required: true },
    price: { type: String, required: true },
    endDate: { type: Date, required: true },
    basic: {
        model: { type: String },
        variant: { type: String },
        condition: { type: String },
        make: { type: String },
        fuel: { type: String },
        mileage: { type: String },
        color: { type: String },
        type: { type: String },
    },
    damage: {
        areaDamage: { type: String },
        driveCondition: { type: String },
        engineAsessment: { type: String },
        airbagAssessment: { type: String },
        suspension: { type: String },
        exterior: { type: String },
    },
    remarks: { type: String },

});

auctionCarSchema.virtual('available').get(function () {
    return new Date() < this.endDate;
});

const AuctionCar = mongoose.model('AuctionCar', auctionCarSchema);
module.exports = AuctionCar;
