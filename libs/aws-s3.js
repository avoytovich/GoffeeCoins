// Load the SDK for JavaScript
var aws = require('aws-sdk');
var multer = require('multer')
var multerS3 = require('multer-s3')
const crypto = require("crypto");
const config = require('../env');

aws.config.accessKeyId = config.AWS_s3.Access_KEY;
aws.config.secretAccessKey = config.AWS_s3.Access_SECRET;
var s3 = new aws.S3();

class S3Service {
    constructor() {

    }

    uploadFile(options) {
        s3.listBuckets(function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Bucket List", data.Buckets);
            }
        });
    }
}

module.exports.S3Service = new S3Service();
module.exports.upload = (bucket) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                // TODO: How about png?
                cb(null, crypto.randomBytes(16).toString("hex") + '.jpg');
            }
        })
    })
};
