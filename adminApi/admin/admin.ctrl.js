'use strict';

/*
const Admin = require('../../models/admin.model');
const { checkUserOnFirebase } = require('../../helpers/auth.helper');
const ERRORS = require('../../constants/errors');
const { NOT_FOUND } = require('http-statuses');
*/

const adminCtrl = {

    me({ user }) {
        return user;
    },

};

module.exports = adminCtrl;