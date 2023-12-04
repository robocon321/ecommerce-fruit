const {
    Op
} = require("sequelize");
const db = require("../models");
const {
    faker
} = require('@faker-js/faker');
require('dotenv').config();

const getProductByCategories = async (req, res) => {
    let productsWithCategories;
    let page = 1;
    let size = 10;
    let sortBy = [];
    let sortType = [];
    let sort = [];

    const categoryIds = [];
    if (req.query.categories) {
        categoryIds.push(...req.query.categories.split(','));
    }

    if (req.query.page) {
        page = parseInt(req.query.page);
    }

    if (req.query.size) {
        size = parseInt(req.query.size);
    }

    if (req.query.sortBy) {
        sortBy.push(...req.query.sortBy.split(','));
    }

    if (req.query.sortType) {
        sortType.push(...req.query.sortType.split(','));
    }

    if (sortBy.length == sortType.length) {
        for (var i = 0; i < sortBy.length; i++) {
            sort.push([sortBy[i], sortType[i]]);
        }
    }

    const offset = (page - 1) * size;

    try {
        if (categoryIds.length == 0) {
            productsWithCategories = await db.Product.findAll({
                attributes: ['id', 'name', 'images', 'real_price', 'sale_price', 'createdAt'],
                include: [{
                    model: db.Category,
                    attributes: [],
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
                }, ],
                limit: size,
                offset,
                order: sort
            });
        }
        return res.status(200).json(productsWithCategories);

    } catch (error) {
        return res.status(401).json(error.message);
    }
}

const getProductByRatingCount = async (req, res) => {
    let page = 1;
    let size = 10;

    if (req.query.page) {
        page = parseInt(req.query.page);
    }

    if (req.query.size) {
        size = parseInt(req.query.size);
    }

    const offset = (page - 1) * size;
    const order = [[db.sequelize.literal('review_count'), 'DESC']];

    try {
        products = await db.Product.findAll({
            attributes: [
                'id',
                'name',
                'images',
                'real_price', 
                'sale_price', 
                'createdAt', 
                [db.sequelize.fn('COUNT', db.sequelize.col('ReviewProducts.id')), 'review_count'],
            ],
            include: {
                model: db.ReviewProduct,
                as: 'ReviewProducts',
                attributes: [],
                duplicating: false,
            },
            group: ['Product.id'], 
            order,
            limit: size,
            offset,
        });
        return res.status(200).json(products);

    } catch (error) {
        return res.status(401).json(error.message);
    }
}

const getProductByRatingAverage = async (req, res) => {
    let page = 1;
    let size = 10;

    if (req.query.page) {
        page = parseInt(req.query.page);
    }

    if (req.query.size) {
        size = parseInt(req.query.size);
    }

    const offset = (page - 1) * size;
    const order = [[db.sequelize.literal('rating_avg'), 'DESC']];

    try {
        products = await db.Product.findAll({
            attributes: [
                'id',
                'name',
                'images',
                'real_price', 
                'sale_price', 
                'createdAt', 
                [db.sequelize.fn('AVG', db.sequelize.col('ReviewProducts.star')), 'rating_avg'],
            ],
            include: {
                model: db.ReviewProduct,
                as: 'ReviewProducts',
                attributes: [],
                duplicating: false,
            },
            group: ['Product.id'], 
            order,
            limit: size,
            offset,
        });
        return res.status(200).json(products);

    } catch (error) {
        return res.status(401).json(error.message);
    }
}

const generateProduct = async (req, res) => {
    const name = faker.commerce.productName();
    const short_description = faker.commerce.productDescription();
    const real_price = faker.number.float({
        min: 10,
        max: 1000,
        precision: 0.01
    });
    const sale_price = faker.number.float({
        min: 10,
        max: 1000,
        precision: 0.01
    });
    const stock = faker.number.int({
        min: 0,
        max: 100
    });
    const weight = faker.number.float({
        min: 10,
        max: 100,
        precision: 0.01
    });
    const images = generateArrayImage();
    const long_description = generateLongDescription(
        name,
        short_description,
        images
    );
    const categories = await generateCategories();

    const data = {
        name,
        short_description,
        long_description,
        real_price,
        sale_price,
        stock,
        weight,
        images
    }

    try {
        const userOwner = await db.User.findByPk(process.env.USER_ID);
        const newProduct = await db.Product.create(data);
        await newProduct.addCategories(categories);
        await newProduct.setUser(userOwner);

        return res.status(201).json(newProduct);
    } catch (e) {
        return res.status(401).json(e.message);

    }

}

const generateCategories = async () => {
    let categories = [];

    let count = faker.number.int({
        min: 1,
        max: 3
    });

    while (count > 0) {
        let categoryId = faker.number.int({
            min: 1,
            max: 11
        });
        if (categories.some(item => item.id == categoryId)) continue;
        else {
            const category = await db.Category.findByPk(categoryId);
            categories.push(category);
            count--;
        }
    }
    return categories;
}

const generateArrayImage = () => {
    let count = faker.number.int({
        min: 4,
        max: 10
    });
    let images = [];
    while (count > 0) {
        let image = faker.image.urlLoremFlickr({
            category: 'food'
        });
        images.push(image);
        count--;
    }

    return images.join(",");
}

const generateLongDescription = (
    name,
    short_description,
    images) => {
    return `<h1>${name}</h1><img src='${images.split(",")[0]}' alt='Not found' /><br /><b>${short_description}</b><p>${faker.lorem.paragraph({min: 5, max: 10})}</p><img src='${faker.image.urlLoremFlickr({ category: 'food' })}' alt='Not found' /><br /><h2>${faker.commerce.productAdjective()}</h2><p>${faker.lorem.paragraph({min: 5, max: 10})}</p><h2>${faker.commerce.productMaterial()}</h2><p>${faker.lorem.paragraph({min: 5, max: 10})}</p>`
}

module.exports = {
    generateProduct,
    getProductByCategories,
    getProductByRatingCount,
    getProductByRatingAverage
}