'use strict';

const mongoose = require('../libs/mongoose');
const { modelOptions, MODELS } = require('../constants/index');
const { values } = require('lodash');

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


VisitorSchema.statics.getLastVisit = function(userID, coffeeHouseID) {
    return this.find({ userID, coffeeHouseID})
        .sort({arrivalTime: -1})
        .limit(1)
        .then(([visit]) => visit);
};

const Visitor = mongoose.model(MODELS.VISITOR, VisitorSchema);

module.exports = Visitor;

var visit = new Visitor({
    userID: 'pgotPEVQcgUsjlHjUImxkq9nQEO2',
    coffeeHouseID: '59c9d506ce0e011b6d53d0c8',
});
visit.save();
