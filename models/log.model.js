'use strict';

const mongoose = require('../libs/mongoose');

const {modelOptions} = require('../constants/index');



const LogSchema = new mongoose.Schema({

    type: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    }
}, modelOptions);




const Log = mongoose.model('LogInformation', LogSchema);

module.exports = Log;