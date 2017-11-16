/*****************   Connection   *********************/

/**
 * @api {.} ?token=...your_token
 * @apiName Connection
 * @apiExample {js} Example usage:
 *     var socket = io.connect('http://localhost:8030?token=eyJhbGciOiJIUzI1...');
 * @apiExample {js} Example usage:
 *     var socket = io.connect('http://localhost:8030/', {
 *          query: 'token=' + your_token
 *     });
 * @apiDescription ## Connect to Socket server
 * @apiGroup SOCKET Connection
 * @apiVersion 0.0.0
 * @apiParam {String} your_token User authorization token `eyJhbGci...`
 */


/*****************   Triggers   *********************/


/**
 * @api {emit} ... hello
 * @apiName hello
 * @apiExample {js} Example usage:
 *     socket.emit('hello', message)
 * @apiDescription ## You can emit 'hello' event and server will emit 'world' event. It's for test.
 * @apiGroup SOCKET Triggers
 * @apiVersion 0.0.0
 * @apiParam {String} message `Hello`
 */


/**
 * @api {emit} ... inCoffeeHouse
 * @apiName inCoffeeHouse
 * @apiExample {js} Example usage:
 *     socket.emit('inCoffeeHouse', coffeeHouseID)
 * @apiDescription ## You must emit `inCoffeeHouse` event when you came to coffee house. If you are admin of the house server will emit `listOfCurrentVisitors` event.
 * @apiGroup SOCKET Triggers
 * @apiVersion 0.0.0
 * @apiParam {String} coffeeHouseID `59c9d506ce0e011b6d53d0c9`
 */


/**
 * @api {emit} ... disconnect
 * @apiName disconnect
 * @apiExample {js} Example usage:
 *     socket.disconnect()
 * @apiDescription ## When user left the coffee shop, he must disconnect from the server.
 * @apiGroup SOCKET Triggers
 * @apiVersion 0.0.0
 */


/*****************   Listeners   *********************/


/**
 * @api {on} ... world
 * @apiName world
 * @apiExample {js} Example usage:
 *     socket.on('world', function(message) {
 *
 *     })
 * @apiDescription ## message you sent on `hello` event + ' world!'
 * @apiGroup SOCKET Listeners
 * @apiVersion 0.0.0
 *
 * @apiParam {String} message `Hello world!`
 */


/**
 * @api {on} ... listOfCurrentVisitors
 * @apiName listOfCurrentVisitors
 * @apiExample {js} Example usage:
 *     socket.on('listOfCurrentVisitors', function(users) {
 *
 *     })
 * @apiDescription ## Event for admin of coffee shop emitted when he connected to server. (visit of coffee shop)
 * @apiGroup SOCKET Listeners
 * @apiVersion 0.0.0
 *
 * @apiParam {Array} users `[ { _id, name, coins, avatarUrl }, ... ]`
 */


/**
 * @api {on} ... newUserInCoffeeHouse
 * @apiName newUserInCoffeeHouse
 * @apiExample {js} Example usage:
 *     socket.on('newUserInCoffeeHouse', function(user) {
 *
 *     })
 * @apiDescription ## Event for admin of coffee shop emmited when new user connected to server. (visit of coffee shop)
 * @apiGroup SOCKET Listeners
 * @apiVersion 0.0.0
 *
 * @apiParam {Object} user `{ _id, name, coins, avatarUrl }`
 */