require('dotenv').config();

const dev = {
    host: process.env.DEV_REDIS_HOST,
    port: process.env.DEV_REDIS_PORT,
    password: process.env.DEV_REDIS_PW
}

const product = {
    host: process.env.PRODUCT_REDIS_HOST,
    port: process.env.PRODUCT_REDIS_PORT,
    password: process.env.PRODUCT_REDIS_PW    
}

const config = { dev, product };

const env = process.env.NODE_ENV || 'dev';

module.exports = config[env] || config.product;