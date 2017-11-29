'use strict';

const BonusRequest = require('../../models/bonusRequest.model');
const Visitor = require('../../models/visitor.model');
const {REQUEST_STATUSES, BONUS_TYPES} = require('../../constants');
const _ = require('lodash');
const Promise = require('bluebird');
const moment = require('moment');
const XLSX = require('xlsx');


const AnalyticsApi = {

	coffeeAnalytics({query: {start, end}, params: {_id}, user}) {
		const query = {
			status: REQUEST_STATUSES.ACCEPTED,
			createdAt: {
				$gte: start,
				$lte: end,
			},
		};
		if (!user.isGlobalAdmin()) {
			query.coffeeHouseID = {
				$in: user.coffeeHouseID
			};
		}
		if (_id) {
			query.coffeeHouseID = _id;
		}
		return Promise.join(
			BonusRequest.find(Object.assign({type: BONUS_TYPES.COIN}, query)),
			BonusRequest.find(Object.assign({type: BONUS_TYPES.FREE}, query))
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

	paychart({query: {start, end}, params: {_id}, user}) {
		const query = {
			status: REQUEST_STATUSES.ACCEPTED,
			createdAt: {
				$gte: start,
				$lte: end,
			},
		};
		if (!user.isGlobalAdmin()) {
			query.coffeeHouseID = {
				$in: user.coffeeHouseID
			};
		}
		if (_id) {
			query.coffeeHouseID = _id;
		}

		return Promise.join(
			BonusRequest.count(Object.assign({type: BONUS_TYPES.COIN}, query)),
			BonusRequest.count(Object.assign({type: BONUS_TYPES.FREE}, query))
		)
			.then(([bought, free]) => [
				['Coffee', 'Count'],
				['Bought coffee', bought],
				['Free coffee', free],
			]);
	},

	visitorChart({query: {start, end}, params: {_id}, user}) {
		const query = {
			arrivalTime: {
				$gte: start,
				$lte: end,
			},
		};
		if (!user.isGlobalAdmin()) {
			query.coffeeHouseID = {
				$in: user.coffeeHouseID
			};
		}
		if (_id) {
			query.coffeeHouseID = _id;
		}
		return Visitor.find(query)
			.then(visits => {
				return _.groupBy(visits, item => {
					const date = new Date(item.arrivalTime);
					date.setHours(0, 0, 0, 0);
					return moment(date).format('DD.MM.YYYY');
				});
			})
			.then(result => {
				const data = [
					['Date', 'All users', 'Unique users']
				];
				_.forEach(result, (item, date) => {
					data.push([
						date,
						item.length || 0,
						_.uniqBy(item, 'userID').length || 0
					])
				});
				return data;
			});
	},

	timeOfStayChart({query: {start, end}, params: {_id}, user}) {
		const query = {
			exitTime: {
				$exists: true
			},
			arrivalTime: {
				$gte: start,
				$lte: end,
			},
		};
		if (!user.isGlobalAdmin()) {
			query.coffeeHouseID = {
				$in: user.coffeeHouseID
			};
		}
		if (_id) {
			query.coffeeHouseID = _id;
		}
		return Visitor.find(query)
			.then(visits => {
				return {
					result: _.groupBy(visits, item => {
						const diff = item.exitTime - item.arrivalTime;
						return Math.floor(diff / (5 * 60 * 1000)) * 5 + 'm';
					}),
					average: visits.reduce((a, b) => {
						a.sum += (b.exitTime - b.arrivalTime) / (60 * 1000);
						a.count += 1;
						return a;
					}, {sum: 0, count: 0})
				}
			})
			.then(({result, average}) => {
				const data = [];
				_.forEach(result, (item, period) => {
					data.push([
						period,
						item.length || 0
					])
				});
				return {
					data: [['Period', 'User count']].concat(data.sort((a, b) => {
						const res = a[0].length - b[0].length;
						if (res === 0) {
							return a[0] > b[0] ? 1 : -1;
						}
						return res;
					})),
					average: ((average) => {
						const result = Math.floor(average.sum / average.count);
						return ((isNaN(result)) ? 0 : result) + 'm';
					})(average)
				};
			})
	},

	exportExcel(reqData) {

		const createSpreadSheet = (result) => {
			if (result.data) {
				if(result.data[0]) {
					result.data[0].push('average');
				}
				if(result.data[1]) {
					result.data[1].push(result.average);
				}
				result = result.data;
			}
			const ws = XLSX.utils.aoa_to_sheet(result);
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, 'CoffeeCoin');
			const buffer = XLSX.write(wb, {type: 'buffer', bookType: 'xlsx'});

			return buffer;
		};

		switch (reqData.query.chartType) {
			case 'coffee':
				return AnalyticsApi.coffeeAnalytics({query: reqData.query, params: reqData.params, user: reqData.user})
					.then(createSpreadSheet);
				break;
			case 'paychart':
				return AnalyticsApi.paychart({query: reqData.query, params: reqData.params, user: reqData.user})
					.then(createSpreadSheet);
				break;
			case 'visits':
				return AnalyticsApi.visitorChart({query: reqData.query, params: reqData.params, user: reqData.user})
					.then(createSpreadSheet);
				break;
			case 'time':
				return AnalyticsApi.timeOfStayChart({query: reqData.query, params: reqData.params, user: reqData.user})
					.then(createSpreadSheet);
				break;
			default:
				return 'Not found';
		}
	}
};

module.exports = AnalyticsApi;