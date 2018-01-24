'use strict';

const Admin = require('../../models/admin.model');
const Crypto = require('crypto');
const { NOT_FOUND, FORBIDDEN, CREATED } = require('http-statuses');
const ERRORS = require('../../constants/errors');
const { FirebaseAuth } = require('../../libs/firebase');
const mailjet = require('../../libs/mailjet');
const config = require('../../env');

const adminHelpers = {

  forgotPassword(email) {
    const code = Crypto.randomBytes(16).toString('hex');
    return Admin.findOne({ email, 'disabled.removed': false })
      .then(admin => {
        if (!admin) {
          throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
        }

        admin.verificationCode = code;
        return admin.save()
      })
      .then(admin => {
        return mailjet.sendEmail({
          type: 'forgot-password',
          subject: 'Set up a new password',
          email,
          verificationCode: admin.verificationCode,
          productName: 'Coffee Coins',
          name: admin.name,
          action_url: config.endpoint + ':' + config.adminPort + '/reset-password?id=' + admin._id + '&email=' + email + '&code=' + admin.verificationCode
        });
      })
      .then(() => {
        return {
          message: 'Email with reset password link was sent on your email'
        };
      })
  },

  activateOwner(id, name, activationCode, password) {
    if (!id) {
      throw NOT_FOUND.createError("id is missing");
    }

    if (!activationCode) {
      throw NOT_FOUND.createError("Activation code is missing");
    }

    if (!password) {
      throw NOT_FOUND.createError("Password is missing");
    }

    if (!name) {
      throw NOT_FOUND.createError("Name is missing");
    }

    return Admin.findById(id)
      .then(admin => {
        if (!admin) {
          throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
        }

        if (admin.activationCode !== activationCode) {
          throw NOT_FOUND.createError('Activation code not found');
        }

        return FirebaseAuth.getUser(id).then(user => {
          return FirebaseAuth.updateUser(user.uid, { password, displayName: name, disabled: false, emailVerified: true  })
        }).then(firebaseUser => {
          admin.name = name;
          admin.activationCode = '';
          admin.disabled.blocked = false;
          return admin.save();
        }).then(() => {
          return { message: 'Done!' }
        });

      });
  },

  resetPassword(id, code, password) {
    if (!id) {
      throw NOT_FOUND.createError("Id is missing");
    }

    if (!code) {
      throw NOT_FOUND.createError("Verification code is missing");
    }

    if (!password) {
      throw NOT_FOUND.createError("Password is missing");
    }

    return Admin.findById(id)
      .then(admin => {
        if (!admin) {
          throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
        }

        if (admin.verificationCode !== code) {
          throw NOT_FOUND.createError('Verification code not found');
        }

        return FirebaseAuth.getUser(id).then(user => {
          console.log('?>', user)
          return FirebaseAuth.updateUser(user.uid, { password })
        }).then(firebaseUser => {
          admin.verificationCode = '';
          return admin.save();
        }).then(() => {
          return { message: 'all ok' }
        });

      });
  }
};

module.exports = adminHelpers;