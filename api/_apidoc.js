/**
 * @api {post} /api/v1/adminRequest/accept/:requestID Confirm Admin Request
 * @apiName Confirm Admin Request
 * @apiDescription ## Confirm Admin Request if you are admin
 * @apiGroup Admin Request
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} requestID mongoId (url param)
 *
 * @apiSuccess {Boolean} success `true`
 * @apiSuccess {String} message `OK`
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,"message":"OK"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {post} /api/v1/adminRequest/decline/:requestID Reject Admin Request
 * @apiName Reject Admin Request
 * @apiDescription ## Reject Admin Request if you are admin
 * @apiGroup Admin Request
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} requestID mongoId (url param)
 *
 * @apiSuccess {Boolean} success `true`
 * @apiSuccess {String} message `OK`
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,"message":"OK"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {get} /api/v1/adminRequest/ Get info for Admin Panel
 * @apiName Get info for Admin Panel
 * @apiDescription ## Get info for Admin Panel (if you are admin)
 * @apiGroup Admin Request
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiSuccess {Array} adminRequests `[{_id, status, createdAt, updatedAt, coffeeHouseID: { _id, name, avatarUrl, address, status }}]`
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {post} /api/v1/bonusRequest/ Send Bonus Request
 * @apiName Send bonus request
 * @apiDescription ##
 * @apiGroup Bonus Request
 * @apiVersion 0.0.0
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
 * @apiVersion 0.0.0
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
 * @api {post} /api/v1/bonusRequest/confirm/:requestID Confirm Bonus Request
 * @apiName Confirm Bonus Request
 * @apiDescription ## Confirm Bonus Request if you are admin
 * @apiGroup Bonus Request
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} requestID mongoId (url param)
 *
 * @apiSuccess {Boolean} success `true`
 * @apiSuccess {String} message `OK`
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,"message":"OK"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {post} /api/v1/bonusRequest/reject/:requestID Reject Bonus Request
 * @apiName Reject Bonus Request
 * @apiDescription ## Reject Bonus Request if you are admin
 * @apiGroup Bonus Request
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} requestID mongoId (url param)
 *
 * @apiSuccess {Boolean} success `true`
 * @apiSuccess {String} message `OK`
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,"message":"OK"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {get} /api/v1/coffeeHouse/coords?lng&lat Get coffee shops by coords
 * @apiName Get coffee shops by coords
 * @apiDescription ## Get coffee shops by coords in radius 5km
 * @apiGroup Coffee House
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Float} lng Longitude (url query)
 * @apiParam {Float} lat Latitude (url query)
 *
 * @apiParamExample {url} Url-Example
 * http://54.72.192.165:8030/api/v1/coffeeHouse/coords?lng=22.290801&lat=48.616542
 *
 * @apiSuccess {Array} CoffeeHouses `[{_id, name, avatarUrl, location: [lng,lat], address}]`
 *
 * @apiSuccessExample {json} Success-Response:
 * [{"_id": "59c9d506ce0e011b6d53d0cb","avatarUrl": "http://www.coffeeshopcompany.ru/upload/medialibrary/b79/IMG_3244.JPG","location": [22.290801,48.616542],"address": "Prospekt","name": "Totem2"}]
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {get} /api/v1/coffeeHouse/wifi?lng&lat Get wifi
 * @apiName Get wifi
 * @apiDescription ## Get wifi info of coffee shops by coords in radius 100km
 * @apiGroup Coffee House
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Float} lng Longitude (url query)
 * @apiParam {Float} lat Latitude (url query)
 *
 * @apiParamExample {url} Url-Example
 * http://54.72.192.165:8030/api/v1/coffeeHouse/wifi?lng=22.290801&lat=48.616542
 *
 * @apiSuccess {Array} CoffeeHouses `[{_id, name, avatarUrl, address, location: [lng,lat], wifi: {bssid, wifiPassword, ssid, welcomeMessage}}]`
 *
 * @apiSuccessExample {json} Success-Response:
 * [{"_id":"59c925d3f278d958557746c6","avatarUrl":"http://www.coffeeshopcompany.ru/upload/medialibrary/b79/IMG_3244.JPG","address":"Svabska 96","name":"Totem2","location":[22.290801,48.616542],"wifi":{"bssid":"a0:f3:c1:fe:76:a2","wifiPassword":"key","ssid":"TOTEM","welcomeMessage":"Welcome from \"Totem\""}}]
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {get} /api/v1/coffeeHouse/:id Get by id
 * @apiName Get by id
 * @apiDescription ## Get coffee shop by id
 * @apiGroup Coffee House
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Strind} id CoffeeHouse (url param)
 *
 * @apiParamExample {url} Url-Example
 * http://54.72.192.165:8030/api/v1/coffeeHouse/59c9d506ce0e011b6d53d0c9
 *
 * @apiSuccess {String} _id CoffeeHouseID
 * @apiSuccess {String} avatarUrl url
 * @apiSuccess {String} description
 * @apiSuccess {Number} coins Count of coins to get free coffe if this shop
 * @apiSuccess {String} address
 * @apiSuccess {String} name
 * @apiSuccess {Object} social (optional) `{facebook, instagram, twitter, google, pinterest}`
 * @apiSuccess {String[]} bannerUrls Array of URLs
 * @apiSuccess {Number} lastVisit Timestamp (optional)
 * @apiSuccess {Number} allCoinsCount Count of coins received by the user in the coffee shop
 *
 * @apiSuccessExample {json} Success-Response:
 * {"_id":"59c925d3f278d958557746c4","avatarUrl":"https://i.ytimg.com/vi/LX1Nmnfigps/maxresdefault.jpg","description":"This should be passizhy, but the wifi data is unknown yet...","coins":15,"address":"Svabska 70","name":"PAssizhy","socials":{"facebook":"https://www.facebook.com/andris95","instagram":"https://www.instagram.com/szaniszlo.andras/","pinterest":"sdfgdsfg"},"bannerUrls":["https://i.ytimg.com/vi/LX1Nmnfigps/maxresdefault.jpg","https://ohare.regency.hyatt.com/content/dam/PropertyWebsites/regency/chiro/Media/All/Hyatt-Regency-OHare-P223-Perks-Coffee-Shop-1280x720.jpg","http://newcairoonline.com/property/0417/104/8122015065156_coffee-shop-for-rent-in_new-cairo-online.jpg"],"lastVisit":1506347970551,"allCoinsCount":0}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {post} /api/v1/coffeeHouse/discharge/:id Discharge
 * @apiName Discharge
 * @apiDescription ## Discharge from coffee house if you are admin
 * @apiGroup Coffee House
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Strind} id CoffeeHouse (url param)
 *
 * @apiParamExample {url} Url-Example
 * http://54.72.192.165:8030/api/v1/coffeeHouse/discharge/59c9d506ce0e011b6d53d0c9
 *
 * @apiSuccess {Boolean} success `true`
 * @apiSuccess {String} message `OK`
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,"message":"OK"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {post} /api/v1/user/ SignUp
 * @apiName SignUp
 * @apiDescription ## Save new user information created by firebase
 * @apiGroup Auth
 * @apiVersion 0.0.0
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
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {post} /api/v1/user/link link user by referalID
 * @apiName Link referal user
 * @apiDescription ## Used to get token
 * @apiGroup Auth
 * @apiVersion 0.0.0
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
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {post} /api/v1/user/login Login
 * @apiName Login
 * @apiDescription ## Used to get token
 * @apiGroup Auth
 * @apiVersion 0.0.0
 *
 * @apiParam {String} _id Users UID from firebase.
 *
 * @apiSuccess {Object} user User data object. `{ _id, coins, name, avatarUrl, adminInCoffeeHouses, referalId }`
 * @apiSuccess {String} token  User access token (JWT).
 *
 * @apiSuccessExample {json} Success-Response
 * {"user":{"referalID":"5BX9K2","coffeeHouseCoins":10,"adminRequestsCount":0,"coins":67,"_id":"5BX9K2ul4gZruIOsLXJoEXBfuhR2","name":"seruy","avatarUrl":"loreMPixel.com/400/200","adminInCoffeeHouses":[]},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Qlg5SzJ1bDRnWnJ1SU9zTFhKb0VYQmZ1aFIyIiwidHlwZSI6IlVzZXIiLCJpYXQiOjE1MTIxMjE4OTR9.6U02XHTNqbGkQN6nTdgKSFadx93fiI523JgPDMdk5EQ"}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {get} /api/v1/user/ Get Me
 * @apiName Get Me
 * @apiDescription ## Get current user
 * @apiGroup User
 * @apiVersion 0.0.0
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
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {put} /api/v1/user/ Update Me
 * @apiName Update Me
 * @apiDescription ## Update current user information
 * @apiGroup User
 * @apiVersion 0.0.0
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
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {get} /api/v1/user/invited Get invited friends
 * @apiName Get invited friends
 * @apiDescription ## Get invited friends
 * @apiGroup User
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiSuccess {Array} Users `[{_id, name, avatarUrl, coins}]`
 *
 * @apiSuccessExample {json} Success-Response
 * [{"_id":"5BX9K2ul4gZruIOsLXJoEXBfuhR2","name":"Opa","avatarUrl":"http://www.lorempixel.com/people/400/200","coins":17000000000}]
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */

/**
 * @api {post} /api/v1/user/invited/:_id Get bonus for invite
 * @apiName Get bonus for invite
 * @apiDescription ## Get bonus for invited friends
 * @apiGroup User
 * @apiVersion 0.0.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {String} _id your friend UID. (url param)
 *
 * @apiParamExample {url} Url-Example
 * http://54.72.192.165:8030/api/v1/user/invited/5BX9K2ul4gZruIOsLXJoEXBfuhR2
 *
 * @apiSuccess {Number} coins your coins
 *
 * @apiSuccessExample {json} Success-Response
 * {"coins":17000000000}
 *
 * @apiError {Boolean} success `false`
 * @apiError {String} message Error message
 */
