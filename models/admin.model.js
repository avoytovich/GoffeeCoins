'use strict';

const mongoose = require('../libs/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('../env');
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
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
    coffeeHouseID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE,
    }],
    avatarUrl: {
        type: String,
    },
    type: {
        type: String,
        default: ADMIN_TYPES.OWNER,
    },
    disabled: {
        blocked: {
            type: Boolean,
            default: false,
        },
        removed: {
            type: Boolean,
            default: false,
        },
    },
    internal: {
        type: Boolean,
        default: false,
        select: false,
    },
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

AdminSchema.methods.generateJWT = function() {
    return jwt.sign({
        _id: this._id,
        type: MODELS.ADMIN,
        role: this.type,
    }, config.secret);
};

AdminSchema.methods.isOwnerInCoffeeHouse = function (houseId) {
    return this.type === ADMIN_TYPES.OWNER &&
        this.coffeeHouseID.some(item => {
            return String(item) === String(houseId);
        });
};

AdminSchema.plugin(uniqueValidator, UNIQUE_VL_OPTIONS);

const Admin = mongoose.model(MODELS.ADMIN, AdminSchema);

module.exports = Admin;