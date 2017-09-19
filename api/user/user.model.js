'use strict';

const mongoose = require('../../libs/mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    name: String,
    avatarUrl: String,
    referalId: {
        type: String,
        ref: 'users'
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;