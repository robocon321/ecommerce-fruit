const express = require('express');
const { generateReviewProduct, saveReviewProduct } = require('../controllers/ReviewProductController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const router = express.Router()

router.get('/generate', (req, res) => generateReviewProduct(req, res));
router.post('/', authenticateToken, (req, res) => saveReviewProduct(req, res));

module.exports = router;