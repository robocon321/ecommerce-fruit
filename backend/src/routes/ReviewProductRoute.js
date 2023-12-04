const express = require('express');
const { generateReviewProduct } = require('../controllers/ReviewProductController');
const router = express.Router()

router.get('/generate', (req, res) => generateReviewProduct(req, res));

module.exports = router;