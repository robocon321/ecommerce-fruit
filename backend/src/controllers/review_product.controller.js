const {
    faker
} = require('@faker-js/faker');
const {
    generateProductId,
    generateUserId
} = require('../utils/generateData');
const { saveReviewProductService, generateReviewProductService } = require('../services/review_product.service');

const saveReviewProduct = async (req, res) => {
    const {
        star,
        comment,
        product_id
    } = req.body;
    const {
        user_id
    } = req;

    const response = await saveReviewProductService(user_id, star, comment, product_id);
    res.status(response.status).json(response.data);
}

const generateReviewProduct = async (req, res) => {
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
    
    const response = await generateReviewProductService(productId, userId, comment, star);
    res.status(response.status).json(response.data);
}

module.exports = {
    generateReviewProduct,
    saveReviewProduct
}