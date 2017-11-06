"use strict";

const env = process.env;

module.exports = {
    port: env.PORT || 8030,
    adminPort: env.ADMIN_PORT || 8031,
    secret: '9datuWxCQFWcqStAOuZC',
    mongoUrl: env.MONGO_URL || 'mongodb://localhost:27017/coffeeCoins',
    GCM: 'AAAAdlaeNfk:APA91bENIVbag06SNzz1eKWp8iXbg28BRcaSIl1SZUshv3hPtXDxV3FiNMlBYnna4RJiOGvgmXexKjrTuVa4O4xwOfb5rzDYh9Ko8qkicDZYzHEd04jVWE4W2IPgl2CvF2lOjghNjZlh',
    firebaseURL: 'https://remotediscount-4e237.firebaseio.com',
    mailjet: {
        api: "1a58a3c2244c772f1e4ed932ce8ba928",
        secret: "ac559dfea4d892eb7a6731e4fbd8b0e0",
        email: "leopesyk@ukr.net",
        from: "CoffeeCoin"
    },
};