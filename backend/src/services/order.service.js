const Response = require('../dto/response.dto');
const db = require('../models');

const orderProductService = async (user_id, carts) => {
    return await db.sequelize.transaction({
        autocommit: false
    }).
    then(async (t) => {
        try {
            // check carts
            const order_details = [];

            for (var i = 0; i < carts.length; i++) {
                const {
                    product_id,
                    quantity
                } = carts[i];

                if (quantity == undefined || quantity <= 0) {
                    await t.rollback();
                    return new Response(400, "Quantity not null and more than 0");
                }

                const product = await db.Product.findByPk(product_id, {
                    attributes: ["stock", "sale_price"]
                });

                if (product.stock < quantity) {
                    await t.rollback();
                    return new Response(400, "Stock < Quantity");
                }

                await db.Product.update({
                    stock: product.stock - quantity
                }, {
                    where: {
                        id: product_id
                    },
                    transaction: t
                })

                order_details.push({
                    product_id,
                    quantity,
                    price: product.sale_price
                })
            }

            // insert new order
            const order = await db.Order.create({
                user_id,
                status: 'CREATED'
            }, {
                transaction: t
            });

            // insert new order_details        
            const newOrderDetails = await db.OrderDetail.bulkCreate(order_details.map(item => ({
                ...item,
                order_id: order.id
            })), {
                transaction: t
            });

            await t.commit();

            return new Response(200, {
                order,
                order_details: newOrderDetails
            });
        } catch (e) {
            await t.rollback();
            console.error(e);
            return new Response(500, "Server have problem");
        }
    });

}

module.exports = {
    orderProductService
}