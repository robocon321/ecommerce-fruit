const {
    generateProductId,
    generateUserId
} = require('../utils/generateData');
const db = require('../models');
const {
    generateCartService,
    saveCartService,
    removeCartService,
    updateCartsService
} = require('../services/cart.service');

const generateCart = async (req, res) => {
    try {
        const user_id = await generateUserId();
        const product_id = await generateProductId();
        const quantity = Math.ceil(Math.random() * 5);

        const response = await generateCartService(user_id, product_id, quantity);
        res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const saveCart = async (req, res) => {
    const {
        user_id,
        body: {
            product_id,
            quantity
        }
    } = req;

    const response = await saveCartService(user_id, product_id, quantity);
    res.status(response.status).json(response.data);
}

const removeCart = async (req, res) => {
    const {
        user_id,
        body: {
            product_id
        }
    } = req;

    const response = await removeCartService(user_id, product_id);
    res.status(response.status).json(response.data);
}

const updateCarts = async (req, res) => {
    const carts = req.body;
    const {
        user_id
    } = req;

    const response = await updateCartsService(user_id, carts);
    res.status(response.status).json(response.data);
}

module.exports = {
    generateCart,
    saveCart,
    removeCart,
    updateCarts
}