'use strict';

const { knoxConfig } = require('../env');
const knox = require('knox');

const client = knox.createClient(knoxConfig);

module.exports = client;
