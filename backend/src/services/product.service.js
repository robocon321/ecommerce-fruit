const Response = require('../dto/response.dto');
const {
    Op
} = require("sequelize");
const db = require("../models");

const getProductByCategoriesService = async (categoryIds, offset, size, sort) => {
    try {
        if (categoryIds.length == 0) {
            productsWithCategories = await db.Product.findAll({
                attributes: ['id', 'name', 'images', 'real_price', 'sale_price', 'createdAt'],
                include: [{
                    model: db.Category,
                    attributes: [],
                    as: 'categories'
                }, ],
                limit: size,
                offset,
                order: sort
            });
        } else {
            productsWithCategories = await db.Product.findAll({
                attributes: ['id', 'name', 'images', 'real_price', 'sale_price', 'createdAt'],
                include: [{
                    model: db.Category,
                    attributes: [],
                    where: {
                        id: {
                            [Op.in]: categoryIds,
                        },
                    },
                    as: 'categories'
                }, ],
                limit: size,
                offset,
                order: sort
            });
        }
        return new Response(200, productsWithCategories);

    } catch (e) {
        console.error(e);
        return new Response(500, "Server have problem");
    }
}

const getProductByRatingCountService = async (offset, size, order) => {
    try {
        products = await db.Product.findAll({
            attributes: [
                'id',
                'name',
                'images',
                'real_price',
                'sale_price',
                'createdAt',
                [db.sequelize.fn('COUNT', db.sequelize.col('reviews.id')), 'review_count'],
            ],
            include: {
                model: db.ReviewProduct,
                as: 'reviews',
                attributes: [],
                duplicating: false,
            },
            group: ['Product.id'],
            order,
            limit: size,
            offset,
        });
        return new Response(200, products);
    } catch (e) {
        console.error(e);
        return new Response(500, "Server have problem");
    }
}

const getProductByRatingAverageService = async (offset, size, order) => {
    try {
        products = await db.Product.findAll({
            attributes: [
                'id',
                'name',
                'images',
                'real_price',
                'sale_price',
                'createdAt',
                [db.sequelize.fn('AVG', db.sequelize.col('reviews.star')), 'rating_avg'],
            ],
            include: {
                model: db.ReviewProduct,
                as: 'reviews',
                attributes: [],
                duplicating: false,
            },
            group: ['Product.id'],
            order,
            limit: size,
            offset,
        });
        return new Response(200, products);
    } catch (e) {
        console.error(e);
        return new Response(500, "Server have problem");
    }
}

const getTopDiscountProductService = async (offset, size, order) => {
    try {
        products = await db.Product.findAll({
            attributes: [
                'id',
                'name',
                'images',
                'real_price',
                'sale_price',
                'createdAt',
                [
                    db.sequelize.literal('((real_price - sale_price) * 100 / real_price) '),
                    'discount'
                ]
            ],
            order,
            limit: size,
            offset,
        });
        return new Response(200, products);
    } catch (e) {
        console.error(e);
        return new Response(500, "Server have problem");
    }

}

const generateProductService = async (userId, data, categories) => {
    try {
        const userOwner = await db.User.findByPk(userId);
        const newProduct = await db.Product.create(data);
        await newProduct.addCategories(categories);
        await newProduct.setUser(userOwner);

        return new Response(201, newProduct);
    } catch (e) {
        console.error(e);
        return new Response(500, "Server have problem");
    }

}

const getProductByIdService = async (id) => {
    const product = await db.Product.findByPk(id, {
        attributes: [
            "id",
            "name",
            "short_description",
            "long_description",
            "real_price",
            "sale_price",
            "stock",
            "weight",
            "images",
            "createdAt",
            "updatedAt",
            [
                db.sequelize.literal('((real_price - sale_price) * 100 / real_price) '),
                'discount'
            ],
            // [db.sequelize.fn('AVG', db.sequelize.col('reviews.star')), 'rating_avg'],
            // [db.sequelize.fn('COUNT', db.sequelize.col('reviews.id')), 'rating_count']
        ],
        include: [{
            model: db.ReviewProduct,
            attributes: ["id", "comment", "star", "createdAt", "updatedAt"],
            duplicating: false,
            as: 'reviews',
            include: {
                model: db.User,
                duplicating: false,
                attributes: ["id", "username"],
                as: 'user'
            }
        }, {
            model: db.User,
            duplicating: false,
            attributes: ["id", "username"],
            as: 'user'
        }, {
            model: db.Category,
            duplicating: false,
            attributes: ["id", "name"],
            as: 'categories',
            through: {
                attributes: [] // Exclude the attributes of the intermediate table (ProductCategory)
            }
        }]
    });
    return new Response(200, product);
}

const getProductsService = async (categoryIds, search, minPrice, maxPrice, offset, size, sort) => {
    let productsAndCount;

    try {
        if (categoryIds.length == 0) {
            productsAndCount = await db.Product.findAndCountAll({
                attributes: ['id', 'name', 'images', 'real_price', 'sale_price', "stock", 'createdAt'],
                include: [{
                    model: db.Category,
                    attributes: [],
                    as: 'categories'
                }, ],
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    },
                    sale_price: {
                        [Op.between]: [minPrice, maxPrice]
                    }
                },
                limit: size,
                offset,
                order: sort
            });
        } else {
            productsAndCount = await db.Product.findAndCountAll({
                attributes: ['id', 'name', 'images', 'real_price', 'sale_price', "stock", 'createdAt'],
                include: [{
                    model: db.Category,
                    attributes: [],
                    where: {
                        id: {
                            [Op.in]: categoryIds,
                        }
                    },
                    as: 'categories'
                }, ],
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    },
                    sale_price: {
                        [Op.between]: [minPrice, maxPrice]
                    }
                },
                limit: size,
                offset,
                order: sort
            });
        }

        return new Response(200, {
            itemCount: productsAndCount.count,
            products: productsAndCount.rows,
            pageCount: Math.ceil(productsAndCount.count / size) 
        });
    } catch (e) {
        console.error(e);
        return new Response(500, "Server have problem");
    }
}

// zScore for order type - price_products, newest_product, discount_products, rating_products
// Hash for product info - product info
// Set for product id - product#[id]



module.exports = {
    generateProductService,
    getProductByCategoriesService,
    getProductByRatingCountService,
    getProductByRatingAverageService,
    getTopDiscountProductService,
    getProductByIdService,
    getProductsService
}