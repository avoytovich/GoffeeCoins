/**
 * @api {post} /api/v1/user/ SignUp
 * @apiName SignUp
 * @apiDescription Save new user information created by firebase
 * @apiGroup Auth
 *
 * @apiParam {String} _id Users UID from firebase.
 * @apiParam {String} name Users Name.
 * @apiParam {String} avatarUrl avatar url link.
 * @apiParam {String} referalId referal id. (optional)
 *
 * @apiSuccess {Object} user User data object.
 * @apiSuccess {String} token  User access token (JWT).
 */

/**
 * @api {post} /api/v1/user/login Login
 * @apiName Login
 * @apiDescription Used to get token
 * @apiGroup Auth
 *
 * @apiParam {String} _id Users UID from firebase.
 *
 * @apiSuccess {Object} user User data object.
 * @apiSuccess {String} token  User access token (JWT).
 */

/**
 * @api {get} /api/v1/user/ Get Me
 * @apiName Get Me
 * @apiDescription Get current user
 * @apiGroup User
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiSuccess {Object} user User data object.
 */

/**
 * @api {put} /api/v1/user/ Update Me
 * @apiName Update Me
 * @apiDescription Update current user information
 * @apiGroup User
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} name Users Name.
 * @apiParam {String} avatarUrl avatar url link.
 *
 * @apiSuccess {Object} user User data object.
 */