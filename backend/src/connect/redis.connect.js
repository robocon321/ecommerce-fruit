const config = require('../config/redis.config');
const {
    createClient
} = require('redis');

const redisClient = createClient({
    port: config.port,
    host: config.host,
    password: config.password
});

redisClient.on('error', (err) => console.error(err));
redisClient.connect();

module.exports = redisClient;