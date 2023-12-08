const db = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json('Access denied');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json('Invalid token');
    req.user_id = decoded.data;
    next();
  });
}

module.exports = authenticateToken;
