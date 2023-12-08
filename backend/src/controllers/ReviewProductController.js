const {
    faker
} = require('@faker-js/faker');
const db = require('../models');
const {
    generateProductId,
    generateUserId
} = require('../utils/generateData');
require('dotenv').config();

const saveReviewProduct = async (req, res) => {
    const {
        star,
        comment,
        product_id
    } = req.body;
    const {
        user_id
    } = req;
    const errors = [];

    if (star < 1 || star > 5) {
        errors.push("Range star [1,5]");
    }

    if (!comment) errors.push("Comment not null");
    if (!product_id) errors.push("Product id not null");

    if (errors.length > 0) return res.status(403).json(errors.join(","));

    const countOldReview = await db.ReviewProduct.count({
        where: {
            product_id,
            user_id
        }
    });

    if (countOldReview > 0) {
        return res.status(409).json("Already exists data");
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


            return res.status(201).json(reviewWithUser);
        } catch (error) {
            return (res.status(403).json(error.message));
        }
    }
}

const generateReviewProduct = async (req, res) => {
    try {
        const productId = await generateProductId();
        const userId = await generateUserId();
        const comment = faker.lorem.sentences({
            min: 1,
            max: 3
        });
        const star = faker.number.int({
            min: 1,
            max: 5
        });

        const review = await db.ReviewProduct.create({
            product_id: productId,
            user_id: userId,
            comment,
            star
        })

        return res.status(200).json(review);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    generateReviewProduct,
    saveReviewProduct
}