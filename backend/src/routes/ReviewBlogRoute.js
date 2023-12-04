const express = require('express');
const { generateReviewBlog } = require('../controllers/ReviewBlogController');
const router = express.Router()

router.get('/generate', (req, res) => generateReviewBlog(req, res));

module.exports = router;