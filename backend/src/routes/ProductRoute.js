const { generateProduct } = require('../controllers/ProductController');
const express = require('express');
const router = express.Router()

router.get('/generate', (req, res) => generateProduct(req, res));

module.exports = router;