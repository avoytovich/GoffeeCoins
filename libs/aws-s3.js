// Load the SDK for JavaScript
var aws = require('aws-sdk');
var multer = require('multer')
var multerS3 = require('multer-s3')
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
module.exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.AWS_s3.S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        const name = 't1111.jpg';
      cb(null, name)
    }
  })
})
 