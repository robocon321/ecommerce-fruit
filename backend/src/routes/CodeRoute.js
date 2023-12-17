const express = require('express');
const { generateCode } = require('../controllers/CodeController');
const router = express.Router()

router.post('/', (req, res) => generateCode(req, res));

module.exports = router;