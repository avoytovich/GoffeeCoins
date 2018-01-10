'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const Visitor = require('../../models/visitor.model');
const User = require('../../models/user.model');
const Admin = require('../../models/admin.model');
const Promise = require('bluebird');

const coffeeHouseHelpers = {

  updateUserAdminField(adminsList, coffeeHouseID) {
    User.find({ adminInCoffeeHouses: coffeeHouseID })
      .then(admins => Promise.map(admins, user => {
        var index = user.adminInCoffeeHouses.indexOf(coffeeHouseID);
        if (index > -1) {
          user.adminInCoffeeHouses.splice(index, 1);
          return user.save();
        }
        return user;
      })).then(() => {
        return User.update({'_id': { $in: adminsList}}, { $addToSet: { adminInCoffeeHouses: coffeeHouseID } })
      });

  },

  updateOwnerField(owner, coffeeHouseID) {
    Admin.find({ coffeeHouseID })
      .then(admins => Promise.map(admins, admin => {
        var index = admin.coffeeHouseID.indexOf(coffeeHouseID);
        if (index > -1) {
          admin.coffeeHouseID.splice(index, 1);
          return admin.save();
        }
        return admin;
      })).then(() => {
        return Admin.findByIdAndUpdate(owner, { $addToSet: { coffeeHouseID } })
      });

  }
};

module.exports = coffeeHouseHelpers;