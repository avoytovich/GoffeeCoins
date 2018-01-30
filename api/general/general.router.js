'use strict';

/*const {

} = require('../../constants');*/
const multipart = require('connect-multiparty');
const { readFileAndPutTos3, putFile } = require('../../helpers/file.helpers');

const generalRouter = require('express').Router();


/*generalRouter.get('/constants', (req, res) => res.json({

}));*/

generalRouter.post('/file', multipart(), ({ files: { file } }, res) => {
    readFileAndPutTos3(file)
        .then(url => res.json({ url }));
});

module.exports = generalRouter;