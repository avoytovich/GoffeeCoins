'use strict';

const { AWS_s3 } = require('../env');
const AWS = {
    key: AWS_s3.Access_KEY,
    secret: AWS_s3.Access_SECRET,
    bucket: AWS_s3.S3_BUCKET
};
const knox = require('knox');

const client = knox.createClient(AWS);

module.exports = client;
