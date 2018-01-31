"use strict";

const env = process.env;

module.exports = {
    port: env.PORT || 8030,
    endpoint: 'http://52.19.188.118',
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
    knoxConfig: {
        key: 'AKIAJHI6EIE7I37DLQPQ',
        secret: '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',
        bucket: 'sbgboost',
    },
    AWS_s3: {
        Access_KEY: env.S3_ACCESS_KEY || "AKIAJHI6EIE7I37DLQPQ",
        Access_SECRET: env.S3_ACCESS_SECRET || "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",
        S3_BUCKET: env.S3_BUCKET || "coffeecoin-dev",
    },
};