const { faker } = require('@faker-js/faker');
const { generateBlogId, generateUserId } = require('../utils/generateData');
const { generateReviewBlogService } = require('../services/review_blog.service');

const generateReviewBlog = async (req, res) => {
    const blogId = await generateBlogId();
    const userId = await generateUserId();
    const comment = faker.lorem.sentences({
        min: 1,
        max: 3
    });
    
    const response = await generateReviewBlogService(blogId, userId, comment);
    res.status(response.status).json(response.data);
}

module.exports = {
    generateReviewBlog
}