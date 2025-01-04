const express = require('express');
const { generateCode } = require('../controllers/code.controller');
const router = express.Router()

router.post('/', (req, res) => generateCode(req, res));

module.exports = router;