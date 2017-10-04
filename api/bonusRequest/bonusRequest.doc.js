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
 * @api {get} /api/v1/bonusRequest/:coffeeHouseID Get Bonus Requests
 * @apiName Get Bonus Requests
 * @apiDescription ## Get Bonus Requests if you are admin
 * @apiGroup Bonus Request
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} coffeeHouseID mongoId (url param)
 *
 * @apiSuccess {Array} Requests `[{_id, count, type, createdAt, userID: { _id, name, avatarUrl }}]`
 *
 * @apiSuccessExample {json} Success-Response
 * [{"_id":"59ca53f8061c020dbf51f98d","count":16,"userID":{"_id":"5BX9K2ul4gZruIOsLXJoEXBfuhR2","name":"Opa","avatarUrl":"https://pbs.twimg.com/profile_images/903926754489880576/jmBtVUwD_400x400.jpg"},"createdAt":1506691675784,"type":"COIN"}]
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */


/**
 * @api {post} /api/v1/bonusRequest/comfirm/:requestID Confirm Bonus Request
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
 * @api {post} /api/v1/bonusRequest/reject/:requestID Reject Bonus Request
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