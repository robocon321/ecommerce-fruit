const { faker } = require('@faker-js/faker');
const db = require('../models')
require('dotenv').config();

const generateReviewProduct = async (req, res) => {
    try {
        const productId = await generateProduct();
        const userId = await generateUser();
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

const generateProduct = async () => {
    const productIds = (await db.Product.findAll({
        attributes: ['id']
    })).map(item => item.id);

    const randomIndex = faker.number.int({
        min: 0,
        max: productIds.length - 1
    });

    const randomProductId = productIds[randomIndex];
    // const randomProduct = await db.Product.findByPk(randomProductId);
    return randomProductId;
}

const generateUser = async () => {
    const userIds = (await db.User.findAll({
        attributes: ['id']
    })).map(item => item.id);

    const randomIndex = faker.number.int({
        min: 0,
        max: userIds.length - 1
    });

    const randomUserId = userIds[randomIndex];
    // const randomUser = await db.User.findByPk(randomUserId);
    return randomUserId;
}

module.exports = {
    generateReviewProduct
}