const {
    generateProduct,
    getProductByCategories,
    getProductByRatingCount,
    getProductByRatingAverage,
    getTopDiscountProduct,
    getProductById,
    getProducts
} = require('../controllers/product.controller');
const express = require('express');
const router = express.Router()

router.get('/generate', (req, res) => generateProduct(req, res));
router.get('/getByCategories', (req, res) => getProductByCategories(req, res));
router.get('/getByRatingCount', (req, res) => getProductByRatingCount(req, res));
router.get('/getByRatingAvg', (req, res) => getProductByRatingAverage(req, res));
router.get('/getByDiscount', (req, res) => getTopDiscountProduct(req, res));
router.get('/:id', (req, res) => getProductById(req, res));
router.get('', (req, res) => getProducts(req, res));

module.exports = router;