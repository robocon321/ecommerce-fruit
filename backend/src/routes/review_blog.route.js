const express = require('express');
const { generateReviewBlog } = require('../controllers/review_blog.controller');
const router = express.Router()

router.get('/generate', (req, res) => generateReviewBlog(req, res));

module.exports = router;