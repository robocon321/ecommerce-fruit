const express = require('express');
const { generateReviewProduct, saveReviewProduct } = require('../controllers/review_product.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const router = express.Router()

router.get('/generate', (req, res) => generateReviewProduct(req, res));
router.post('/', authenticateToken, (req, res) => saveReviewProduct(req, res));

module.exports = router;