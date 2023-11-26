const express = require('express');
const { addNewCategory, getCategories } = require('../controllers/CategoryController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const adminRoleMiddleware = require('../middlewares/AdminRoleMiddleware');
const router = express.Router()

router.post('/', authenticateToken, adminRoleMiddleware, (req, res) => addNewCategory(req, res));
router.get('/', (req, res) => getCategories(req, res));

module.exports = router;