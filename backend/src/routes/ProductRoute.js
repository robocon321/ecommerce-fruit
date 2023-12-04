const { generateProduct, getProductByCategories, getProductByReviewCount, getProductByRatingCount, getProductByRatingAverage } = require('../controllers/ProductController');
const express = require('express');
const router = express.Router()

router.get('/generate', (req, res) => generateProduct(req, res));
router.get('/getByCategories', (req, res) => getProductByCategories(req, res));
router.get('/getByRatingCount', (req, res) => getProductByRatingCount(req, res));
router.get('/getByRatingAvg', (req, res) => getProductByRatingAverage(req, res));

module.exports = router;