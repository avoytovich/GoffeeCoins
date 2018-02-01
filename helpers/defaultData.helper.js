'use strict';

const logger = require('../libs/logger');
const Admin = require('../models/admin.model');
const CoffeeHouse = require('../models/coffeeHouse.model');
const Visitor = require('../models/visitor.model');
const Note = require('../models/notification.model');
const AdminRequest = require('../models/adminRequest.model');
const Promise = require('bluebird');
const {
    GLOBAL_ADMIN,
    COFFEEHOUSE,
    OWNER_ADMIN,
} = require('../constants/default');


// TODO: REMOVE THIS!!
const User = require('../models/user.model');
User.create({_id: '123', name: 'Example', avatarUrl: 'Example', }, function (err, small) {});

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


Visitor.find({exitTime: {$exists: false}})
    .then(visits => Promise.map(visits, visit => visit.getOut()));

CoffeeHouse.find({})
    .select('_id')
    .then(houses => houses.map(house => house._id))
    .then(housesIds => Promise.all([
        Note.deleteMany({coffeeHouseID: { $nin: housesIds } }),
        AdminRequest.deleteMany({ coffeeHouseID: { $nin: housesIds } }),
    ]));