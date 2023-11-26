const express = require('express');
const { addNewRole } = require('../controllers/RoleController');
const router = express.Router()

router.post('/', (req, res) => addNewRole(req, res));

module.exports = router;