const express = require('express');
const authenticateToken = require('../middlewares/AuthMiddleware');
const { orderProduct } = require('../controllers/OrderController');
const router = express.Router()

router.post('', authenticateToken, (req, res) => orderProduct(req, res));

module.exports = router;