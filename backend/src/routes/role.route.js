const express = require('express');
const { addNewRole } = require('../controllers/role.controller');
const router = express.Router()

router.post('/', (req, res) => addNewRole(req, res));

module.exports = router;