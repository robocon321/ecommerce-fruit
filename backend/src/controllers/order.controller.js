const db = require('../models');
const { orderProductService } = require('../services/order.service');

const orderProduct = async (req, res) => {
    const carts = req.body;
    const {
        user_id
    } = req;
    const response = await orderProductService(user_id, carts);
    res.status(response.status).json(response.data);
}

module.exports = {
    orderProduct
}