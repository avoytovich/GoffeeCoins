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