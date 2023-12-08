const {
    generateProductId,
    generateUserId
} = require('../utils/generateData');
const db = require('../models')

const generateWishlist = async (req, res) => {
    try {
        const user_id = await generateUserId();
        const product_id = await generateProductId();
        const wishlist = await db.Wishlist.create({
            user_id,
            product_id
        });
        return res.status(201).json(wishlist);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const saveWishlist = async (req, res) => {
    try {
        const {
            user_id,
            body: {
                product_id
            }
        } = req;

        const countOldWishlist = await db.Wishlist.count({
            where: {
                product_id,
                user_id
            }
        });

        if (countOldWishlist > 0) {
            return res.status(409).json("Already exists data");
        } else {
            const wishlist = await db.Wishlist.create({
                user_id,
                product_id
            });

            return res.status(201).json(wishlist);
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const removeWishlist = async (req, res) => {
    try {
        const {
            user_id,
            body: {
                product_id
            }
        } = req;

        await db.Wishlist.destroy({
            where: {
                user_id,
                product_id
            }
        });

        return res.status(204).json("Deleted!");

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    generateWishlist,
    saveWishlist,
    removeWishlist
}