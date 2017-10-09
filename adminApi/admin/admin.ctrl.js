'use strict';

const Admin = require('../../models/admin.model');
const { checkUserOnFirebase } = require('../../helpers/auth.helper');

const adminCtrl = {

    login({ body: { _id } }) {
        return checkUserOnFirebase(_id)
            .then(firebaseUser => Admin.findById(_id))
            .then(admin => {
                if (!admin) {
                    throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
                }
                return {
                    admin,
                    token: admin.generateJWT()
                }
            });
    },

};

module.exports = adminCtrl;