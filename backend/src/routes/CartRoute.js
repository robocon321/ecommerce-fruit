const express = require('express');
const {
    generateCart, saveCart, removeCart, updateCarts
} = require('../controllers/CartController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const router = express.Router()

router.get('/generate', (req, res) => generateCart(req, res));
router.post('/', authenticateToken, (req, res) => saveCart(req, res));
router.delete('/', authenticateToken, (req, res) => removeCart(req, res));
router.put('/multi', authenticateToken, (req, res) => updateCarts(req, res));

module.exports = router;