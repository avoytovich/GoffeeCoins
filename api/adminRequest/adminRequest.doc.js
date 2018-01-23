/**
 * @api {post} /api/v1/adminRequest/accept/:requestID Confirm Admin Request
 * @apiName Confirm Admin Request
 * @apiDescription ## Confirm Admin Request if you are admin
 * @apiGroup Admin Request
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} requestID mongoId (url param)
 *
 * @apiUse MyHttpSuccess
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,"message":"OK"}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {post} /api/v1/adminRequest/decline/:requestID Reject Admin Request
 * @apiName Reject Admin Request
 * @apiDescription ## Reject Admin Request if you are admin
 * @apiGroup Admin Request
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} requestID mongoId (url param)
 *
 * @apiUse MyHttpSuccess
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,"message":"OK"}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {get} /api/v1/adminRequest/ Get info for Admin Panel
 * @apiName Get info for Admin Panel
 * @apiDescription ## Get info for Admin Panel (if you are admin)
 * @apiGroup Admin Request
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiSuccess {Array} adminRequests `[{_id, status, createdAt, updatedAt, coffeeHouseID: { _id, name, avatarUrl, address, status }}]`
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */