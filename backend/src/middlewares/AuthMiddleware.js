const config = require('../config/sequelize.config');
const db = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json('Access denied');

  jwt.verify(token, config.app.jwt_secret, (err, decoded) => {
    if (err) return res.status(403).json('Invalid token');
    req.user_id = decoded.data;
    next();
  });
}

module.exports = authenticateToken;