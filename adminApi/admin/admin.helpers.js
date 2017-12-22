'use strict';

const Admin = require('../../models/admin.model');
const { NOT_FOUND, FORBIDDEN, CREATED } = require('http-statuses');
const ERRORS = require('../../constants/errors');
const { FirebaseAuth } = require('../../libs/firebase');

const adminHelpers = {

  forgotPassword(email) {
    return Admin.findOneAndUpdate({ email }, {verificationCode: '01'})
      .then(admin => {
        if (!admin) {
          throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
        }
      })
      .then(admin => {
        console.log('SEND EMAIL')
      })
      .then(() => {
        return {
            message: 'Email with reset password link was sent on your email'
        };
    })
  },

  resetPassword(email, code, password) {
    if (!email) {
      throw NOT_FOUND.createError("Email code is missing");
    }

    if (!code) {
      throw NOT_FOUND.createError("Verification code is missing");
    }

    if (!password) {
      throw NOT_FOUND.createError("Password is missing");
    }

    return Admin.findOne({ email })
      .then(admin => {
        if (!admin) {
          throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
        }

        if (admin.verificationCode !== code) {
          throw NOT_FOUND.createError('Verification code not found');
        }

        return FirebaseAuth.getUserByEmail(email).then(user => {
          return FirebaseAuth.updateUser(user.uid, { password })
        }).then(firebaseUser => {
          admin.verificationCode = '';
          return admin.save();
        }).then(() => {
          return {message: 'all ok'}
        });

      });
  }
};

module.exports = adminHelpers;