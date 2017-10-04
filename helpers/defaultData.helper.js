'use strict';

const { FirebaseAuth } = require('../libs/firebase');
const logger = require('../libs/logger');
const Admin = require('../models/admin.model');
const CoffeeHouse = require('../models/coffeeHouse.model');
const { GLOBAL_ADMIN, COFFEEHOUSE, OWNER_ADMIN } = require('../constants/default');
const { ADMIN_TYPES } = require('../constants');
const Promise = require('bluebird');
const ctx = {};


FirebaseAuth.getUserByEmail(GLOBAL_ADMIN.fb.email)
    .catch(error => {
        logger.log(error);
    })
    .then(userRecord =>  {
        if (!userRecord) {
            return FirebaseAuth.createUser(GLOBAL_ADMIN.fb);
        }
        return userRecord;
    })
    .then(firebaseUser => {
        Object.assign(GLOBAL_ADMIN, { id: firebaseUser.uid });
        return Admin.findById(firebaseUser.uid);
    })
    .then(admin => {
        if (!admin) {
            return Admin.create(
                Object.assign(
                    { _id: GLOBAL_ADMIN.id },
                    GLOBAL_ADMIN.mongo
                )
            );
        }
        return admin;
    })
    .then(admin => logger.info('Global Admin created'));




Promise.join(

    CoffeeHouse.findById(COFFEEHOUSE._id)
        .then(house => {
            if (!house) {
                return CoffeeHouse.create(COFFEEHOUSE);
            }
            return house;
        }),

    FirebaseAuth.getUserByEmail(OWNER_ADMIN.fb.email)
        .catch(error => {
            logger.log(error);
        })
        .then(userRecord =>  {
            if (!userRecord) {
                return FirebaseAuth.createUser(OWNER_ADMIN.fb);
            }
            return userRecord;
        })
        .then(firebaseUser => {
            Object.assign(OWNER_ADMIN, { id: firebaseUser.uid });
            return Admin.findById(firebaseUser.uid);
        })
        .then(admin => {
            if (!admin) {
                return Admin.create(
                    Object.assign(
                        { _id: OWNER_ADMIN.id },
                        OWNER_ADMIN.mongo
                    )
                );
            }
            return admin;
        })

).then(([ house, admin ]) => {
    if (!house.owner) {
        return house.update({
            $set: {
                owner: admin._id
            }
        })
    }
}).then(house => logger.info('Owner and house created'));
