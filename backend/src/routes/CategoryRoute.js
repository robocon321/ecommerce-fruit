const express = require('express');
const { addNewCategory, getCategories } = require('../controllers/CategoryController');
const router = express.Router()

router.post('/', (req, res) => addNewCategory(req, res));
router.get('/', (req, res) => getCategories(req, res));

module.exports = router;