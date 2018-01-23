/**
 * @api {get} /api/v1/coffeeHouse/coords?lng&lat Get coffee shops by coords
 * @apiName Get coffee shops by coords
 * @apiDescription ## Get coffee shops by coords in radius 5km
 * @apiGroup Coffee House
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Float} lng Longitude (url query)
 * @apiParam {Float} lat Latitude (url query)
 *
 * @apiParamExample {url} Url-Example
 * http://52.19.188.118:8030/api/v1/coffeeHouse/coords?lng=22.290801&lat=48.616542
 *
 * @apiSuccess {Array} CoffeeHouses `[{_id, name, avatarUrl, location: [lng,lat], address}]`
 *
 * @apiSuccessExample {json} Success-Response:
 * [{"_id": "59c9d506ce0e011b6d53d0cb","avatarUrl": "http://www.coffeeshopcompany.ru/upload/medialibrary/b79/IMG_3244.JPG","location": [22.290801,48.616542],"address": "Prospekt","name": "Totem2"}]
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {get} /api/v1/coffeeHouse/wifi?lng&lat Get wifi
 * @apiName Get wifi
 * @apiDescription ## Get wifi info of coffee shops by coords in radius 100km
 * @apiGroup Coffee House
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Float} lng Longitude (url query)
 * @apiParam {Float} lat Latitude (url query)
 *
 * @apiParamExample {url} Url-Example
 * http://52.19.188.118:8030/api/v1/coffeeHouse/wifi?lng=22.290801&lat=48.616542
 *
 * @apiSuccess {Array} CoffeeHouses `[{_id, name, avatarUrl, address, location: [lng,lat], wifi: {bssid, wifiPassword, ssid, welcomeMessage}}]`
 *
 * @apiSuccessExample {json} Success-Response:
 * [{"_id":"59c925d3f278d958557746c6","avatarUrl":"http://www.coffeeshopcompany.ru/upload/medialibrary/b79/IMG_3244.JPG","address":"Svabska 96","name":"Totem2","location":[22.290801,48.616542],"wifi":{"bssid":"a0:f3:c1:fe:76:a2","wifiPassword":"key","ssid":"TOTEM","welcomeMessage":"Welcome from \"Totem\""}}]
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {get} /api/v1/coffeeHouse/:id Get by id
 * @apiName Get by id
 * @apiDescription ## Get coffee shop by id
 * @apiGroup Coffee House
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Strind} id CoffeeHouse (url param)
 *
 * @apiParamExample {url} Url-Example
 * http://52.19.188.118:8030/api/v1/coffeeHouse/59c9d506ce0e011b6d53d0c9
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
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */


/**
 * @api {post} /api/v1/coffeeHouse/discharge/:id Discharge
 * @apiName Discharge
 * @apiDescription ## Discharge from coffee house if you are admin
 * @apiGroup Coffee House
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
 *
 * @apiParam {Strind} id CoffeeHouse (url param)
 *
 * @apiParamExample {url} Url-Example
 * http://52.19.188.118:8030/api/v1/coffeeHouse/discharge/59c9d506ce0e011b6d53d0c9
 *
 * @apiUse MyHttpSuccess
 *
 * @apiSuccessExample {json} Success-Response
 * {"status":true,"message":"OK"}
 *
 * @apiUse MyHttpError
 * @apiUse MyHttpErrorExtend
 */