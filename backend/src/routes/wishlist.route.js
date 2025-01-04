const express = require('express');
const {
    generateWishlist, saveWishlist, removeWishlist
} = require('../controllers/wishlist.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const router = express.Router()

router.get('/generate', (req, res) => generateWishlist(req, res));
router.post('/', authenticateToken, (req, res) => saveWishlist(req, res));
router.delete('/', authenticateToken, (req, res) => removeWishlist(req, res));

module.exports = router;