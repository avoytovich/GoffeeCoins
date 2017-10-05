'use strict';

const logger = require('../libs/logger');
const Admin = require('../models/admin.model');
const CoffeeHouse = require('../models/coffeeHouse.model');
const Promise = require('bluebird');
const {
    GLOBAL_ADMIN,
    COFFEEHOUSE,
    OWNER_ADMIN,
} = require('../constants/default');


Admin.getOrCreate(GLOBAL_ADMIN)
    .then(admin => logger.info('Global Admin created'))
    .catch(err => logger.error(err));


Promise.join(
    CoffeeHouse.findById(COFFEEHOUSE._id)
        .then(house => {
            if (!house) {
                return CoffeeHouse.create(COFFEEHOUSE);
            }
            return house;
        }),
    Admin.getOrCreate(OWNER_ADMIN)
).then(([ house, admin ]) => {
    if (!house.owner) {
        return house.update({
            $set: {
                owner: admin._id
            }
        })
    }
}).then(house => logger.info('Owner and house created'))
    .catch(err => logger.error(err));
