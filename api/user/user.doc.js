/**
 * @api {post} /api/v1/user/ SignUp
 * @apiName SignUp
 * @apiDescription ## Save new user information created by firebase
 * @apiGroup Auth
 * @apiVersion 0.1.0
 *
 * @apiParam {String} _id Users UID from firebase.
 * @apiParam {String} name Users Name.
 * @apiParam {String} avatarUrl avatar url link.
 *
 * @apiSuccess {Object} user User data object. `{ _id, coins, name, avatarUrl, adminInCoffeeHouses, referalID }`
 * @apiSuccess {String} token  User access token (JWT)
 *
 * @apiSuccessExample {json} Success-Response
 * {"user":{"coins":0,"_id":"1ZGHn5F5bqYn5UUnvhHcEl1hI9o1","name":"bvd","referalID":"1ZGHn5","avatarUrl":"loreMPixel.com/400/200","adminInCoffeeHouses":[]},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxWkdIbjVGNWJxWW41VVVudmhIY0VsMWhJOW8xIiwiaWF0IjoxNTA2NjA4NDQxfQ.nsT6boaZhxnMKhq-WRb-Z5KeGhBG8ny8ValKrCzuMPQ"}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {post} /api/v1/user/link link user by referalID
 * @apiName Link referal user
 * @apiDescription ## Used to get token
 * @apiGroup Auth
 * @apiVersion 0.1.0
 *
 * @apiParam {String} _id Users UID from firebase.
 * @apiParam {String} referalID Your friend referalID.
 *
 * @apiSuccess {String} _id UID.
 * @apiSuccess {String} name
 * @apiSuccess {Number} coins
 * @apiSuccess {Number} coffeeHouseCoins Default coin count to get free coffee
 * @apiSuccess {String} avatarUrl
 * @apiSuccess {String} referalID Your referalID
 * @apiSuccess {String[]} adminInCoffeeHouses (optional)
 *
 * @apiSuccessExample {json} Success-Response
 * {"referalID":"5BX9K2","coffeeHouseCoins":10,"adminRequestsCount":0,"coins":67,"_id":"5BX9K2ul4gZruIOsLXJoEXBfuhR2","name":"seruy","avatarUrl":"loreMPixel.com/400/200","adminInCoffeeHouses":[]}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {post} /api/v1/user/login Login
 * @apiName Login
 * @apiDescription ## Used to get token
 * @apiGroup Auth
 * @apiVersion 0.1.0
 *
 * @apiParam {String} _id Users UID from firebase.
 *
 * @apiSuccess {Object} user User data object. `{ _id, coins, name, avatarUrl, adminInCoffeeHouses, referalId }`
 * @apiSuccess {String} token  User access token (JWT).
 *
 * @apiSuccessExample {json} Success-Response
 * {"user":{"referalID":"5BX9K2","coffeeHouseCoins":10,"adminRequestsCount":0,"coins":67,"_id":"5BX9K2ul4gZruIOsLXJoEXBfuhR2","name":"seruy","avatarUrl":"loreMPixel.com/400/200","adminInCoffeeHouses":[]},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Qlg5SzJ1bDRnWnJ1SU9zTFhKb0VYQmZ1aFIyIiwidHlwZSI6IlVzZXIiLCJpYXQiOjE1MTIxMjE4OTR9.6U02XHTNqbGkQN6nTdgKSFadx93fiI523JgPDMdk5EQ"}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {get} /api/v1/user/ Get Me
 * @apiName Get Me
 * @apiDescription ## Get current user
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiSuccess {String} _id UID.
 * @apiSuccess {String} name
 * @apiSuccess {Number} coins
 * @apiSuccess {Number} coffeeHouseCoins Default coin count to get free coffee
 * @apiSuccess {String} avatarUrl
 * @apiSuccess {String} referalID Your referalID
 * @apiSuccess {String[]} adminInCoffeeHouses (optional)
 *
 * @apiSuccessExample {json} Success-Response
 * {"referalID":"5BX9K2","coffeeHouseCoins":10,"adminRequestsCount":0,"coins":67,"_id":"5BX9K2ul4gZruIOsLXJoEXBfuhR2","name":"seruy","avatarUrl":"loreMPixel.com/400/200","adminInCoffeeHouses":[]}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {put} /api/v1/user/ Update Me
 * @apiName Update Me
 * @apiDescription ## Update current user information
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} name Users Name.
 * @apiParam {String} avatarUrl avatar url link.
 *
 * @apiSuccess {String} _id UID.
 * @apiSuccess {String} name
 * @apiSuccess {Number} coins
 * @apiSuccess {String} avatarUrl
 * @apiSuccess {String} referalID Your referalID
 * @apiSuccess {String[]} adminInCoffeeHouses (optional)
 *
 * @apiSuccessExample {json} Success-Response
 * {"_id":"5BX9K2ul4gZruIOsLXJoEXBfuhR2","referalID":"5BX9K2","name":"Opa","avatarUrl":"http://www.lorempixel.com/people/400/200","adminInCoffeeHouses":[]}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {get} /api/v1/user/invited Get invited friends
 * @apiName Get invited friends
 * @apiDescription ## Get invited friends
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiSuccess {Array} Users `[{_id, name, avatarUrl, coins, coffeeHouseCoins}]`
 *
 * @apiSuccessExample {json} Success-Response
 * [{"_id":"5BX9K2ul4gZruIOsLXJoEXBfuhR2","name":"Opa","avatarUrl":"http://www.lorempixel.com/people/400/200","coins":17000000000,"coffeeHouseCoins":10}]
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {post} /api/v1/user/invited/:_id Get bonus for invite
 * @apiName Get bonus for invite
 * @apiDescription ## Get bonus for invited friends
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} _id your friend UID. (url param)
 *
 * @apiParamExample {url} Url-Example
 * http://52.19.188.118:8030/api/v1/user/invited/5BX9K2ul4gZruIOsLXJoEXBfuhR2
 *
 * @apiSuccess {Number} coins your coins
 *
 * @apiSuccessExample {json} Success-Response
 * {"coins":17000000000}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */