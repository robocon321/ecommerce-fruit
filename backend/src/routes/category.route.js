const express = require('express');
const { addNewCategory, getCategories } = require('../controllers/category.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const adminRoleMiddleware = require('../middlewares/admin.middleware');
const router = express.Router()

router.post('/', authenticateToken, adminRoleMiddleware, (req, res) => addNewCategory(req, res));
router.get('/', (req, res) => getCategories(req, res));

module.exports = router;