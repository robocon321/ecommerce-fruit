const db = require("../models");
const {
    faker
} = require('@faker-js/faker');
const {
    generateLongDescription,
    generateCategories,
    generateUserId,
    generateArrayImage
} = require("../utils/generateData");
const {
    getProductByCategoriesService,
    getProductByRatingCountService,
    getProductByRatingAverageService,
    getTopDiscountProductService,
    generateProductService,
    getProductByIdService,
    getProductsService
} = require("../services/product.service");

const getProductByCategories = async (req, res) => {
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
    const response = await getProductByCategoriesService(categoryIds, offset, size, sort);
    res.status(response.status).json(response.data);
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
    const order = [
        [db.sequelize.literal('review_count'), 'DESC']
    ];

    const response = await getProductByRatingCountService(offset, size, order);
    res.status(response.status).json(response.data);
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
    const order = [
        [db.sequelize.literal('rating_avg'), 'DESC']
    ];

    const response = await getProductByRatingAverageService(offset, size, order);
    res.status(response.status).json(response.data);
}

const getTopDiscountProduct = async (req, res) => {
    let page = 1;
    let size = 10;

    if (req.query.page) {
        page = parseInt(req.query.page);
    }

    if (req.query.size) {
        size = parseInt(req.query.size);
    }

    const offset = (page - 1) * size;
    const order = [
        [
            [db.sequelize.literal('discount'), 'DESC']
        ]
    ];

    const response = await getTopDiscountProductService(offset, size, order);
    res.status(response.status).json(response.data);
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

    const userId = await generateUserId();

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

    const response = await generateProductService(userId, data, categories);
    res.status(response.status).json(response.data);
}

const getProductById = async (req, res) => {
    if (req.params.id) {
        const id = req.params.id;
        const response = await getProductByIdService(id);
        res.status(response.status).json(response.data);
    } else {
        return res.status(400).json('Not found');
    }
}

const getProducts = async (req, res) => {
    let page = 1;
    let size = 10;
    let sortBy = [];
    let sortType = [];
    let sort = [];
    let search = "";
    let categoryIds = [];
    let minPrice = 0;
    let maxPrice = 1000000;

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

    if (req.query.search) {
        search = req.query.search.trim()
    }

    if (req.query.range_price) {
        try {
            const range_price = req.query.range_price.split(',');
            minPrice = parseInt(range_price[0]);
            maxPrice = parseInt(range_price[1]);
            if (minPrice > maxPrice) {
                let tempt = minPrice;
                minPrice = maxPrice;
                maxPrice = tempt;
            }
        } catch (error) {
            return res.status(401).json("Bad request");
        }
    }

    const offset = (page - 1) * size;

    const response = await getProductsService(categoryIds, search, minPrice, maxPrice, offset, size, sort);
    res.status(response.status).json(response.data);
    
}

module.exports = {
    generateProduct,
    getProductByCategories,
    getProductByRatingCount,
    getProductByRatingAverage,
    getTopDiscountProduct,
    getProductById,
    getProducts
}