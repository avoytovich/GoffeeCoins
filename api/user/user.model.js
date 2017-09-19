'use strict';

const mongoose = require('../../libs/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const { modelOptions } = require('../../constants');
const config = require('../../env');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
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

UserSchema.plugin(uniqueValidator, { message: 'User with {PATH} `{VALUE}` already registered.' });

const User = mongoose.model('users', UserSchema);

module.exports = User;