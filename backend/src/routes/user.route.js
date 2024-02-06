const express = require('express');
const { addNewUser } = require('../controllers/user.controller');
const router = express.Router()

router.post('/', (req, res) => addNewUser(req, res));

module.exports = router;