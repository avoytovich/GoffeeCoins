'use strict';

const mongoose = require('../libs/mongoose');
const { modelOptions, MODELS } = require('../constants/index');

const VisitorSchema = new mongoose.Schema({
    userID: {
        type: String,
        ref: MODELS.USER,
        required: true,
    },
    coffeeHouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE,
        required: true,
    },
    arrivalTime: {
        type: Number,
        default: Date.now,
    },
    exitTime: Number
}, Object.assign({}, modelOptions, {timestamps: false}));


VisitorSchema.statics.getLastVisit = function (userID, coffeeHouseID) {
    return this.find({ userID, coffeeHouseID })
        .sort({arrivalTime: -1})
        .limit(1)
        .then(([visit]) => visit);
};

VisitorSchema.methods.getOut = function () {
    this.exitTime = Date.now();
    this.save();
};

const Visitor = mongoose.model(MODELS.VISITOR, VisitorSchema);

module.exports = Visitor;