const express = require('express');
const { addNewUser } = require('../controllers/UserController');
const router = express.Router()

router.post('/', (req, res) => addNewUser(req, res));

module.exports = router;