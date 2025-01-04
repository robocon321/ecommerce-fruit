const Response = require('../dto/response.dto');
const db = require('../models');

const generateReviewBlogService = async (blogId, userId, comment) => {
    try {
        const review = await db.ReviewBlog.create({
            blog_id: blogId,
            user_id: userId,
            comment,
        })

        return new Response(200, review);
    } catch (e) {
        console.error(e);
        return new Response(500, "Server have problem");
    }
}

module.exports = {
    generateReviewBlogService
}