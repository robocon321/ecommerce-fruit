const express = require('express');
const { register, login } = require('../controllers/AuthControlller');
const router = express.Router()

router.post('/register', (req, res) => register(req, res));
router.post('/login', (req, res) => login(req, res));

module.exports = router;