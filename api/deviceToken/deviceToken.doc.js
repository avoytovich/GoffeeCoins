/**
 * @api {put} /api/v1/deviceToken/ Update Device Token
 * @apiName Update Me
 * @apiDescription ## Update current user information
 * @apiGroup Device Token
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} deviceUId Device ID.
 * @apiParam {String} deviceToken device token.
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