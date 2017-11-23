'use strict';

const BonusRequest = require('../../models/bonusRequest.model');
const { REQUEST_STATUSES, BONUS_TYPES } = require('../../constants');
const { GLOBAL_ADMIN } = require('../../constants/default');
const _ = require('lodash');
const Promise = require('bluebird');
const moment = require('moment');


const AnalyticsApi = {

    coffeeAnalytics({ query: { start, end }, params: { _id }, user }) {
        const query = {
            status: REQUEST_STATUSES.ACCEPTED,
            createdAt: {
                $gte: start,
                $lte: end,
            },
        };
        if (String(user._id) !== String(GLOBAL_ADMIN.id)) {
            query.coffeeHouseID = {
                $in: user.coffeeHouseID
            };
        }
        if (_id) {
            query.coffeeHouseID = _id;
        }
        return Promise.join(
            BonusRequest.find(Object.assign({ type: BONUS_TYPES.COIN }, query)),
            BonusRequest.find(Object.assign({ type: BONUS_TYPES.FREE }, query))
        )
            .then(result => {
                return Promise.map(result, arr => {
                    return _.groupBy(arr, item => {
                        const date = new Date(item.createdAt);
                        date.setHours(0, 0, 0, 0);
                        return moment(date).format('DD.MM.YYYY');
                    })
                })
            })
            .then(([coins, free]) => {
                return {
                    [BONUS_TYPES.COIN]: _.forEach(coins, (item, time) => {
                        coins[time] = item.reduce((count, item) => {
                            count += item.count;
                            return count;
                        }, 0);
                    }),
                    [BONUS_TYPES.FREE]: _.forEach(free, (item, time) => {
                        free[time] = item.length;
                    })
                };
            })
            .then(result => {
                result['ALL'] = Object.assign({}, result[BONUS_TYPES.COIN]);
                const all = result['ALL'];
                _.forEach(result[BONUS_TYPES.FREE], (count, time) => {
                    if (all[time]) {
                        all[time] += count;
                    } else {
                        all[time] = count;
                    }
                });
                return result;
            })
            .then(result => {
                const data = [
                    ['Date', 'Bought coffee', 'Free coffee', 'All coffee']
                ];
                _.forEach(result['ALL'], (item, date) => {
                    data.push([
                        date,
                        result[BONUS_TYPES.COIN][date] || 0,
                        result[BONUS_TYPES.FREE][date] || 0,
                        item
                    ])
                });
                return data;
            });
    },

    paychart({ query: { start, end }, params: { _id }, user }) {
        const query = {
            status: REQUEST_STATUSES.ACCEPTED,
            createdAt: {
                $gte: start,
                $lte: end,
            },
        };
        if (_id) {}

        return Promise.join(
            BonusRequest.count(Object.assign({ type: BONUS_TYPES.COIN }, query)),
            BonusRequest.count(Object.assign({ type: BONUS_TYPES.FREE }, query))
        )
            .then(([bought, free]) => [
                ['Coffee', 'Count'],
                ['Bought coffee', bought],
                ['Free coffee', free],
            ]);
    },

};

module.exports = AnalyticsApi;