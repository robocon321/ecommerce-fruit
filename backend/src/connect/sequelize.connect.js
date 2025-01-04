const {
    Sequelize,
} = require('sequelize');

const config = require('../config/sequelize.config.js');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.type,
    logging: false
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}

db.sequelize = sequelize

module.exports = sequelize;