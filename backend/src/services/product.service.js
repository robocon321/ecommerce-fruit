const Response = require('../dto/response.dto');
const {
    Op
} = require("sequelize");
const db = require("../models");
const {
    productByScoreKey,
    productHashKey,
    productSetKey
} = require('../utils/key.redis');
const client = require('../connect/redis.connect');

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
        const productSortedSet = await client.zRange(productByScoreKey("review_count"), 0, -1);
        const productHashPromises = productSortedSet.map(key => client.hGetAll(productHashKey(key)));
        const productHash = await Promise.all(productHashPromises);
        const productResults = productHash.map(item => deserializeProduct(item));
        return new Response(200, productResults);
    } catch (e) {
        console.error(e);
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
}

const getProductByRatingAverageService = async (offset, size, order) => {
    try {
        const productSortedSet = await client.zRange(productByScoreKey("review_avg"), 0, -1);
        const productHashPromises = productSortedSet.map(key => client.hGetAll(productHashKey(key)));
        const productHash = await Promise.all(productHashPromises);
        const productResults = productHash.map(item => deserializeProduct(item));
        return new Response(200, productResults);
    } catch (e) {
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
}

const getTopDiscountProductService = async (offset, size, order) => {
    try {
        const productSortedSet = await client.zRange(productByScoreKey("discount"), 0, -1);
        const productHashPromises = productSortedSet.map(key => client.hGetAll(productHashKey(key)));
        const productHash = await Promise.all(productHashPromises);
        const productResults = productHash.map(item => deserializeProduct(item));
        return new Response(200, productResults);
    } catch (e) {
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

const loadProductDatabaseToCacheService = async () => {
    // set product
    const products = [];

    // get products order by rating count
    const rating_count_products = (await db.Product.findAll({
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
        order: [
            [db.sequelize.literal('review_count'), 'DESC']
        ],
        limit: 20,
        offset: 0,
    })).map(item => item.dataValues);

    const ratingCountProductsPromise = rating_count_products.map(item => client.zAdd(productByScoreKey("review_count"), {
        value: item.id + "",
        score: item.review_count
    }));

    // for (let i = 0; i < rating_count_products.length; i++) {
    //     await client.zAdd(productByScoreKey("review_count"), {
    //         value: rating_count_products[i].id + "",
    //         score: rating_count_products[i].review_count
    //     })
    // }

    products.push(...rating_count_products);

    // get products order by rating avg
    const rating_avg_products = (await db.Product.findAll({
        attributes: [
            'id',
            'name',
            'images',
            'real_price',
            'sale_price',
            'createdAt',
            [db.sequelize.fn('AVG', db.sequelize.col('reviews.id')), 'review_avg'],
        ],
        include: {
            model: db.ReviewProduct,
            as: 'reviews',
            attributes: [],
            duplicating: false,
        },
        group: ['Product.id'],
        order: [
            [db.sequelize.literal('review_avg'), 'DESC']
        ],
        limit: 20,
        offset: 0,
    })).map(item => item.dataValues);

    const ratingAvgProductsPromise = rating_avg_products.map(item => client.zAdd(productByScoreKey("review_avg"), {
        value: item.id + "",
        score: item.review_avg
    }));

    // for (let i = 0; i < rating_avg_products.length; i++) {
    //     await client.zAdd(productByScoreKey("review_avg"), {
    //         value: rating_avg_products[i].id + "",
    //         score: rating_avg_products[i].review_avg
    //     })
    // }

    products.push(...rating_avg_products);


    // get products by price desc
    const price_desc_products = (await db.Product.findAll({
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
        order: [
            [db.sequelize.literal('sale_price'), 'DESC']
        ],
        limit: 20,
        offset: 0,
    })).map(item => item.dataValues);

    const priceDescProductsPromise = price_desc_products.map(item => client.zAdd(productByScoreKey("price_desc"), {
        value: item.id + "",
        score: item.sale_price
    }));

    // for (let i = 0; i < price_desc_products.length; i++) {
    //     await client.zAdd(productByScoreKey("price_desc"), {
    //         value: price_desc_products[i].id + "",
    //         score: price_desc_products[i].sale_price
    //     })
    // }

    products.push(...price_desc_products.filter(f => !products.some(s => s.id == f.id)));

    // get products by price asc
    const price_asc_products = (await db.Product.findAll({
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
        order: [
            [db.sequelize.literal('sale_price'), 'ASC']
        ],
        limit: 20,
        offset: 0,
    })).map(item => item.dataValues);

    const priceAscProductsPromise = price_asc_products.map(item => client.zAdd(productByScoreKey("price_asc"), {
        value: item.id + "",
        score: item.sale_price
    }));

    // for (let i = 0; i < price_asc_products.length; i++) {
    //     await client.zAdd(productByScoreKey("price_asc"), {
    //         value: price_asc_products[i].id + "",
    //         score: price_asc_products[i].sale_price
    //     })
    // }

    products.push(...price_asc_products.filter(f => !products.some(s => s.id == f.id)));

    // get products by created time
    const newest_products = (await db.Product.findAll({
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
        order: [
            [db.sequelize.literal('createdAt'), 'DESC']
        ],
        limit: 20,
        offset: 0,
    })).map(item => item.dataValues);

    const newestProductsPromise = newest_products.map(item => client.zAdd(productByScoreKey("newest"), {
        value: item.id + "",
        score: (new Date(item.createdAt)).getTime()
    }));

    // for (let i = 0; i < newest_products.length; i++) {
    //     await client.zAdd(productByScoreKey("newest"), {
    //         value: newest_products[i].id + "",
    //         score: (new Date(newest_products[i].createdAt)).getTime()
    //     })
    // }

    products.push(...newest_products.filter(f => !products.some(s => s.id == f.id)));

    // get products by discount price
    const discount_products = (await db.Product.findAll({
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
        order: [
            [
                [db.sequelize.literal('discount'), 'DESC']
            ]
        ],
        limit: 20,
        offset: 0,
    })).map(item => item.dataValues);

    const discountProductsPromise = discount_products.map(item => client.zAdd(productByScoreKey("discount"), {
        value: item.id + "",
        score: item.discount
    }));

    // for (let i = 0; i < discount_products.length; i++) {
    //     await client.zAdd(productByScoreKey("discount"), {
    //         value: discount_products[i].id + "",
    //         score: discount_products[i].discount
    //     })
    // }

    products.push(...discount_products.filter(f => !products.some(s => s.id == f.id)));

    const productsPromise = products.map(async (product) => {
        await Promise.all([
            client.hSet(productHashKey(product.id), {
                ...product,
                createdAt: product.createdAt + "",
            }),
            client.sAdd(productSetKey(), product.id + ""),
        ]);
    });

    // for (let i = 0; i < products.length; i++) {
    //     await client.hSet(productHashKey(products[i].id), {
    //         ...products[i],
    //         createdAt: products[i].createdAt + ""
    //     });
    //     await client.sAdd(productSetKey(), products[i].id + "");
    // }

    await Promise.all([
        ratingCountProductsPromise,
        ratingAvgProductsPromise, 
        priceDescProductsPromise, 
        priceAscProductsPromise, 
        newestProductsPromise, 
        discountProductsPromise, 
        productsPromise
    ]);
}

const deserializeProduct = (product) => {
    return {
        ...product,
        sale_price: parseInt(product.sale_price),
        real_price: parseInt(product.real_price)
    }
}

module.exports = {
    generateProductService,
    getProductByCategoriesService,
    getProductByRatingCountService,
    getProductByRatingAverageService,
    getTopDiscountProductService,
    getProductByIdService,
    getProductsService,
    loadProductDatabaseToCacheService
}