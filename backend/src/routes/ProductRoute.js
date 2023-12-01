const { generateProduct, getProductByCategories } = require('../controllers/ProductController');
const express = require('express');
const router = express.Router()

router.get('/generate', (req, res) => generateProduct(req, res));
router.get('/getByCategories', (req, res) => getProductByCategories(req, res));

module.exports = router;