'use strict';

const Visitor = require('../../models/visitor.model');

module.exports = {

    async getHouseWithLastVisit(userID, house) {
        const visit = await Visitor.getLastVisit(userID, house._id);
        if (visit) house.lastVisit = visit.arrivalTime;
        return house;
    }
};