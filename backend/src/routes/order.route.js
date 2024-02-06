const express = require('express');
const authenticateToken = require('../middlewares/auth.middleware');
const { orderProduct } = require('../controllers/order.controller');
const router = express.Router()

router.post('', authenticateToken, (req, res) => orderProduct(req, res));

module.exports = router;