'use strict';

const { CronJob } = require('cron');
const BonusRequest = require('../models/bonusRequest.model');
const { REQUEST_STATUSES } = require('../constants/index');
const Promise = require('bluebird');

const bonusCron = new CronJob({
    cronTime: '0 0 * * * *',
    start: true,
    onTick() {
        BonusRequest.find({
            status: REQUEST_STATUSES.CREATED,
            createdAt: {
                $lt: Date.now() - (/*60**/60*1000)
            }
        }).then(requests => {
            return Promise.map(requests, request => {
                return request.reject();
            })
        });
    }
});