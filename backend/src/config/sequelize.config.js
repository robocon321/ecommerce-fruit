require('dotenv').config();

const dev = {
    app: {
        port: process.env.DEV_APP_PORT,
        jwt_secret: process.env.DEV_JWT_SECRET
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        database: process.env.DEV_DB_DATABASE,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        type: process.env.DEV_DB_TYPE
    }
}

const product = {
    app: {
        port: process.env.PRODUCT_APP_PORT,
        jwt_secret: process.env.PRODUCT_JWT_SECRET,
    },
    db: {
        host: process.env.PRODUCT_DB_HOST,
        port: process.env.PRODUCT_DB_PORT,
        database: process.env.PRODUCT_DB_DATABASE,
        username: process.env.PRODUCT_DB_USERNAME,
        password: process.env.PRODUCT_DB_PASSWORD,
        type: process.env.PRODUCT_DB_TYPE
    }
}

const config = { dev, product };

const env = process.env.NODE_ENV || 'dev';

module.exports = config[env] || config.product;