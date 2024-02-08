const {
    faker
} = require('@faker-js/faker');
const {
    generateCategories,
    generateUserId,
    generateLongDescription
} = require("../utils/generateData");
const { getBlogByCategoriesService, generateBlogService } = require("../services/blog.service");

const getBlogByCategories = async (req, res) => {
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

    const response = await getBlogByCategoriesService(categoryIds, offset, size, sort);
    return res.status(response.status).json(response.data);
}


const generateBlog = async (req, res) => {
    const name = faker.commerce.productName();
    const short_description = faker.commerce.productDescription();
    const image = faker.image.urlLoremFlickr({
        category: 'food'
    });
    const long_description = generateLongDescription(
        name,
        short_description,
        image
    );
    const categories = await generateCategories();

    const userId = await generateUserId();

    const data = {
        name,
        short_description,
        long_description,
        image
    }

    const response = await generateBlogService(userId, data, categories);
    res.status(response.status).json(response.data);
}

module.exports = {
    generateBlog,
    getBlogByCategories
}