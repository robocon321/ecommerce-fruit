const { faker } = require('@faker-js/faker');
const db = require('../models');
const { generateBlogId, generateUserId } = require('../utils/generateData');
require('dotenv').config();

const generateReviewBlog = async (req, res) => {
    try {
        const blogId = await generateBlogId();
        const userId = await generateUserId();
        const comment = faker.lorem.sentences({
            min: 1,
            max: 3
        });

        const review = await db.ReviewBlog.create({
            blog_id: blogId,
            user_id: userId,
            comment,
        })

        return res.status(200).json(review); 

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    generateReviewBlog
}