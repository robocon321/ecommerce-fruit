const Response = require('../dto/response.dto');
const {
    faker
} = require('@faker-js/faker');
const db = require('../models');
const {
    generateProductId,
    generateUserId
} = require('../utils/generateData');

const saveReviewProductService = async (user_id, star, comment, product_id) => {
    const errors = [];

    if (star < 1 || star > 5) {
        errors.push("Range star [1,5]");
    }

    if (!comment) errors.push("Comment not null");
    if (!product_id) errors.push("Product id not null");

    if (errors.length > 0) return new Response(403, errors.join(","));

    const countOldReview = await db.ReviewProduct.count({
        where: {
            product_id,
            user_id
        }
    });

    if (countOldReview > 0) {
        return new Response(409, "Already exists data");
    } else {
        try {
            const review = await db.ReviewProduct.create({
                product_id,
                user_id,
                comment,
                star
            });

            const reviewWithUser = await db.ReviewProduct.findByPk(review.id, {
                attributes: ["id", "comment", "star", "createdAt", "updatedAt"],
                include: {
                    model: db.User,
                    duplicating: false,
                    attributes: ["id", "username"],
                    as: 'user'
                }
            });

            return new Response(201, reviewWithUser);
        } catch (e) {
            console.error(e.message);
            return new Response(500, "Server have problem")
        }
    }
}

const generateReviewProductService = async (productId, userId, comment, star) => {
    try {
        const review = await db.ReviewProduct.create({
            product_id: productId,
            user_id: userId,
            comment,
            star
        })
        return new Response(200, review);
    } catch (e) {
        console.error(e.message);
        return new Response(500, "Server have problem");
    }
}

module.exports = {
    generateReviewProductService,
    saveReviewProductService
}