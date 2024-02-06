const { generateBlog, getBlogByCategories } = require('../controllers/blog.controller');
const express = require('express');
const router = express.Router()

router.get('/generate', (req, res) => generateBlog(req, res));
router.get('/getByCategories', (req, res) => getBlogByCategories(req, res));

module.exports = router;