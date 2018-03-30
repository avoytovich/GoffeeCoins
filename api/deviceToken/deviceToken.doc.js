/**
 * @api {put} /api/v1/deviceToken/ Update Device Token
 * @apiName Update Me
 * @apiDescription ## Update current user information
 * @apiGroup Device Token
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} deviceUId Device ID.
 * @apiParam {String} deviceToken device token.
 *
 * @apiUse MyHttpSuccess
 *
 * @apiSuccessExample {json} Success-Response
 * {"success":true,"message":"OK"}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */