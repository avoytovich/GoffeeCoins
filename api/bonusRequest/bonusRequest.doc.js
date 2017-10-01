/**
 * @api {post} /api/v1/bonusRequest/ Send Bonus Request
 * @apiName Send bonus request
 * @apiDescription ##
 * @apiGroup Bonus Request
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} coffeeHouseID mongoId
 * @apiParam {String} type Type of your request (COIN/FREE)
 * @apiParam {Number} count Count of Coins (optional)
 *
 * @apiParamExample {json} For Coins
 * {"coffeeHouseID": "59c925d3f278d958557746c4","type": "COIN","count": 16}
 * @apiParamExample {json} For Free coffee
 * {"coffeeHouseID": "59c925d3f278d958557746c4","type": "FREE"}
 *
 * @apiSuccess {Boolean} success `true`
 * @apiSuccess {String} message `OK`
 *
 * @apiSuccessExample {json} Success-Response
 * {"success":true,"message":"OK"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */


/**
 * @api {get} /api/v1/bonusRequest/:coffeeHouseID Get Bonus Requests if you are admin
 * @apiName Get Bonus Requests
 * @apiDescription ## Get Bonus Requests if you are admin
 * @apiGroup Bonus Request
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} coffeeHouseID mongoId (url param)
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */