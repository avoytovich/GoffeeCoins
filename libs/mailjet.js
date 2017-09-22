'use strict';

const { mailjet: { apiKey, secretKey } } = require('../env');
const { connect } = require('node-mailjet');

const mailjetClient = connect(apiKey, secretKey);

module.exports = mailjetClient;