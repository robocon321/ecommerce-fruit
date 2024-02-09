const db = require('../models')
const Response = require('../dto/response.dto');

const generateWishlistService = async (user_id, product_id) => {
    try {
        const wishlist = await db.Wishlist.create({
            user_id,
            product_id
        });
        return new Response(201, wishlist);
    } catch (e) {
        console.error(e);
        return res.status(500).json("Server have problem");
    }
}

const saveWishlistService = async (user_id, product_id) => {
    try {
        const countOldWishlist = await db.Wishlist.count({
            where: {
                product_id,
                user_id
            }
        });

        if (countOldWishlist > 0) {
            return new Response(409, "Already exists wishlist");
        } else {
            const wishlist = await db.Wishlist.create({
                user_id,
                product_id
            });

            return new Response(201, wishlist);
        }

    } catch (e) {
        console.error(e.message);
        return new Response(500, "Server have problem");
    }
}

const removeWishlistService = async (user_id, product_id) => {
    try {
        await db.Wishlist.destroy({
            where: {
                user_id,
                product_id
            }
        });

        return new Response(204, "Deleted!");
    } catch (e) {
        console.error(e);
        return new Response(500, "Server have problem");
    }
}

module.exports = {
    generateWishlistService,
    saveWishlistService,
    removeWishlistService
}