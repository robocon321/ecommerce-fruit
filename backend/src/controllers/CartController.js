const {
    generateProductId,
    generateUserId
} = require('../utils/generateData');
const db = require('../models');

const generateCart = async (req, res) => {
    try {
        const user_id = await generateUserId();
        const product_id = await generateProductId();
        const quantity = Math.ceil(Math.random() * 5);
        const cart = await db.Cart.create({
            user_id,
            product_id,
            quantity
        });
        return res.status(201).json(cart);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const saveCart = async (req, res) => {
    try {
        const {
            user_id,
            body: {
                product_id,
                quantity
            }
        } = req;

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

            return res.status(201).json(newCart);
        } else {
            const newCart = await db.Cart.create({
                user_id,
                product_id,
                quantity
            });

            return res.status(201).json(newCart);
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const removeCart = async (req, res) => {
    try {
        const {
            user_id,
            body: {
                product_id
            }
        } = req;

        await db.Cart.destroy({
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

const updateCarts = async (req, res) => {
    const carts = req.body;
    const {
        user_id
    } = req;

    await db.sequelize.transaction({
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
                    return res.status(400).json("Quantity not null and more than 0");
                }

                const product = await db.Product.findByPk(product_id, {
                    attributes: ["stock"]
                });

                if (product.stock < quantity) {
                    return res.status(400).json("Stock < Quantity");
                }
            }

            // remove old carts
            await db.Cart.destroy({
                where: {
                    user_id
                }
            });

            // insert new carts

            const newCarts = await db.Cart.bulkCreate(carts.map(item => ({
                user_id,
                product_id: item.product_id,
                quantity: item.quantity
            })));

            await t.commit();

            return res.status(200).json(newCarts);
        } catch (error) {
            await t.rollback();
            return res.status(500).json(error.message);
        }
    });

}

module.exports = {
    generateCart,
    saveCart,
    removeCart,
    updateCarts
}