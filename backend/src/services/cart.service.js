const Response = require('../dto/response.dto');
const db = require('../models');

const generateCartService = async (user_id, product_id, quantity) => {
    try {
        const cart = await db.Cart.create({
            user_id,
            product_id,
            quantity
        });
        return new Response(201, cart);
    } catch (error) {
        return new Response(500, error.message);
    }
}

const saveCartService = async (user_id, product_id, quantity) => {
    try {
        const countOldCart = await db.Cart.count({
            where: {
                product_id,
                user_id
            }
        });

        if (quantity == undefined || quantity <= 0) {
            return res.status(400).json("Quantity not null and more than 0");
        }

        const product = await db.Product.findByPk(product_id, {
            attributes: ["stock"]
        });

        if (product.stock < quantity) {
            return res.status(400).json("Stock < Quantity");
        }

        if (countOldCart > 0) {
            await db.Cart.update({
                quantity
            }, {
                where: {
                    product_id,
                    user_id
                },
            });

            const newCart = await db.Cart.findOne({
                where: {
                    product_id,
                    user_id
                }
            })

            return new Response(201, newCart);
        } else {
            const newCart = await db.Cart.create({
                user_id,
                product_id,
                quantity
            });

            return new Response(201, newCart);
        }

    } catch (e) {
        console.error(e.message);
        return new Response(500, e.message);
    }
}

const removeCartService = async (user_id, product_id) => {
    try {
        await db.Cart.destroy({
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

const updateCartsService = async (user_id, carts) => {
    return await db.sequelize.transaction({
        autocommit: false
    }).
    then(async (t) => {
        try {
            // check carts
            for (var i = 0; i < carts.length; i++) {
                const {
                    product_id,
                    quantity
                } = carts[i];

                if (quantity == undefined || quantity <= 0) {
                    return new Response(400, "Quantity not null and more than 0");
                }

                const product = await db.Product.findByPk(product_id, {
                    attributes: ["stock"]
                });

                if (product.stock < quantity) {
                    return new Response(400, "Stock < Quantity");
                }
            }

            // remove old carts
            await db.Cart.destroy({
                where: {
                    user_id
                },
                transaction: t
            });

            // insert new carts

            const newCarts = await db.Cart.bulkCreate(carts.map(item => ({
                user_id,
                product_id: item.product_id,
                quantity: item.quantity
            })), {
                transaction: t
            });

            await t.commit();

            return new Response(200, newCarts);
        } catch (e) {
            await t.rollback();
            console.error(e);
            return new Response(500, "Server have problem");
        }
    });
}

module.exports = {
    generateCartService,
    saveCartService,
    removeCartService,
    updateCartsService
}