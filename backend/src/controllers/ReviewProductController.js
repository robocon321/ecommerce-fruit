const { faker } = require('@faker-js/faker');
const db = require('../models');
const { generateProductId, generateUserId } = require('../utils/generateData');
require('dotenv').config();

const generateReviewProduct = async (req, res) => {
    try {
        const productId = await generateProductId();
        const userId = await generateUserId();
        const comment = faker.lorem.sentences({
            min: 1,
            max: 3
        });
        const star = faker.number.int({min: 1, max: 5});

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
    generateReviewProduct
}