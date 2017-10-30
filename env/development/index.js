'use strict';

const env = process.env;

module.exports = {
    port: env.PORT || 8030,
    adminPort: env.ADMIN_PORT || 6031,
    secret: '9datuWxCQFWcqStAOuZC',
    mongoUrl: env.MONGO_URL || 'mongodb://localhost:27017/coffeeCoinsDev',
    firebaseURL: 'https://dev-remotediscount.firebaseio.com',
    mailjet: {
        apiKey: "1a58a3c2244c772f1e4ed932ce8ba928",
        secretKey: "ac559dfea4d892eb7a6731e4fbd8b0e0",
        email: "leopesyk@ukr.net",
        from: "CoffeeCoin"
    },
};