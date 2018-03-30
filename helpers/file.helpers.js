const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const knox = require('../libs/knox');



function putFile(contentType, folder, fullName, buffer) {
    return new Promise((resolve, reject) => {
        const key = `${folder}/${(Date.now())}_${fullName}`;
        const headers = {
            'Content-Type': contentType,
            'x-amz-acl': 'public-read',
        };
        knox.putBuffer(buffer, key, headers, (err, response) => {
            if (err) {
                reject(err);
            } else if (response) {
                const url = knox.https(`${key}`);
                resolve(url);
            }
        });
    });
}

function readFileAndPutTos3(file) {
    file.originalFilename = file.originalFilename.replace(/\s/g, '_');
    return fs.readFileAsync(file.path)
        .then(buffer => Promise.join(
            putFile(
                file.headers['content-type'],
                'coffeeCoins',
                file.originalFilename,
                buffer
            ),
            fs.unlinkAsync(file.path)
        ))
        .then(([url]) => url);
}

module.exports = {
    readFileAndPutTos3,
    putFile
};
