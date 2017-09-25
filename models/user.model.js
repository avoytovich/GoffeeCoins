'use strict';

const mongoose = require('../libs/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const { modelOptions, MODELS, UNIQUE_VL_OPTIONS } = require('../constants/index');
const config = require('../env/index');

const UserSchema = new mongoose.Schema({
    _id: String,
    email: {
        type: String,
        lowercase: true,
        select: false,
        /*unique: true,
        required: true,*/
    },
    name: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: true,
        lowercase: true
    },
    referalId: {
        type: String,
        ref: 'users'
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    }
}, modelOptions);

UserSchema.methods.generateJWT = function() {
    return jwt.sign(
        { _id: this._id },
        config.secret
    );
};

UserSchema.plugin(uniqueValidator, UNIQUE_VL_OPTIONS);

const User = mongoose.model(MODELS.USER, UserSchema);

module.exports = User;