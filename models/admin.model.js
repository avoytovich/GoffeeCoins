'use strict';

const mongoose = require('../libs/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../env/index');
const { getOrCreateAuthUser } = require('../helpers/auth.helper');
const {
    modelOptions,
    MODELS,
    UNIQUE_VL_OPTIONS,
    ADMIN_TYPES,
} = require('../constants');

const AdminSchema = new mongoose.Schema({
    _id: String,
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
    coffeeHouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE,
    },
    avatarUrl: {
        type: String,
        // required: true,
    },
    type: {
        type: String,
        default: ADMIN_TYPES.OWNER,
    }
}, modelOptions);


AdminSchema.statics.getOrCreate = function(data) {
    const self = this;
    return getOrCreateAuthUser(data.fb)
        .then(firebaseUser => {
            Object.assign(data, { id: firebaseUser.uid });
            return self.findById(firebaseUser.uid);
        })
        .then(admin => {
            if (!admin) {
                return self.create(
                    Object.assign(
                        { _id: data.id },
                        data.mongo
                    )
                );
            }
            return admin;
        });
};


/*AdminSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

AdminSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};*/

AdminSchema.methods.generateJWT = function() {
    return jwt.sign(
        { _id: this._id },
        config.secret
    );
};

AdminSchema.plugin(uniqueValidator, UNIQUE_VL_OPTIONS);

const Admin = mongoose.model(MODELS.ADMIN, AdminSchema);

module.exports = Admin;