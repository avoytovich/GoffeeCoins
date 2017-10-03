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
 * @apiSuccess {Number} coins
 *
 * @apiSuccessExample {json} Success-Response
 * {"coins":10}
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
 * @apiSuccess {Number} coins
 *
 * @apiSuccessExample {json} Success-Response
 * {"coins":10}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */


/**
 * @api {post} /api/v1/bonusRequest/comfirm/:requestID Confirm Bonus Request if you are admin
 * @apiName Confirm Bonus Request
 * @apiDescription ## Confirm Bonus Request if you are admin
 * @apiGroup Bonus Request
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} requestID mongoId (url param)
 *
 * @apiSuccess {Boolean} success `true`
 * @apiSuccess {String} message `OK`
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,message:"OK"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */


/**
 * @api {post} /api/v1/bonusRequest/reject/:requestID Reject Bonus Request if you are admin
 * @apiName Reject Bonus Request
 * @apiDescription ## Reject Bonus Request if you are admin
 * @apiGroup Bonus Request
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} requestID mongoId (url param)
 *
 * @apiSuccess {Boolean} success `true`
 * @apiSuccess {String} message `OK`
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,message:"OK"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */