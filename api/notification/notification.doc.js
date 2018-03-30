/**
 * @api {get} /api/v1/coffeeHouse/notification?lang=UA
 * @apiName Get notifications
 * @apiDescription ## Get notifications about your actions
 * @apiGroup History
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Float} lang Language (UA, EN, RU)
 *
 * @apiParamExample {url} Url-Example
 * http://52.19.188.118:8030/api/v1/notification?lang=UA
 *
 * @apiSuccess {Array} Notifications `[{_id, key, bonusRequest: {_id, count, type}, coffeeHouseID: {_id, avatarUrl, name}, createdAt, title, body, sender: {_id, name, avatarUrl}}]`
 *
 * @apiSuccessExample {json} Success-Response:
 * [{"_id":"5a5cc1f0d85fd9449b1e52d2","key":"bonusRequestCoinRejected","bonusRequest":{"_id":"5a577e733398b1358d2835ee","count":2,"type":"COIN"},"coffeeHouseID":{"_id":"5a0062a4e29b7a3f9abe335e","avatarUrl":"http://sbgboost.s3.amazonaws.com/title.jpg","name":"Passizhy"},"createdAt":1516028400202,"title":"CoffeeCoin","body":"Запит на Coins був відхилений адміністратором закладу."}]
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */
