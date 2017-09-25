'use strict';

const mongoose = require('../libs/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { modelOptions, MODELS, UNIQUE_VL_OPTIONS } = require('../constants/index');
const config = require('../env/index');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
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
    hash: {
        type: String,
        select: false,
    },
    salt: {
        type: String,
        select: false,
    },
}, modelOptions);

AdminSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

AdminSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

AdminSchema.methods.generateJWT = function() {
    return jwt.sign(
        { _id: this._id },
        config.secret
    );
};

AdminSchema.plugin(uniqueValidator, UNIQUE_VL_OPTIONS);

const Admin = mongoose.model(MODELS.ADMIN, AdminSchema);

module.exports = Admin;