const {
    generateProductId,
    generateUserId
} = require('../utils/generateData');
const {
    generateWishlistService,
    saveWishlistService,
    removeWishlistService
} = require('../services/wishlist.service');

const generateWishlist = async (req, res) => {
    const user_id = await generateUserId();
    const product_id = await generateProductId();
    const response = await generateWishlistService(user_id, product_id);
    res.status(response.status).json(response.data);
}

const saveWishlist = async (req, res) => {
    const {
        user_id,
        body: {
            product_id
        }
    } = req;

    const response = await saveWishlistService(user_id, product_id);
    res.status(response.status).json(response.data);
}

const removeWishlist = async (req, res) => {
    const {
        user_id,
        body: {
            product_id
        }
    } = req;
    
    const response = await removeWishlistService(user_id, product_id);
    res.status(response.status).json(response.data);
}

module.exports = {
    generateWishlist,
    saveWishlist,
    removeWishlist
}