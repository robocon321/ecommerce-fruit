const express = require('express');
const { register, login, loadUser } = require('../controllers/AuthControlller');
const authenticateToken = require('../middlewares/AuthMiddleware');
const router = express.Router()

router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res) => login(req, res));
router.post('/loadUser', authenticateToken, (req, res) => loadUser(req, res));

module.exports = router;