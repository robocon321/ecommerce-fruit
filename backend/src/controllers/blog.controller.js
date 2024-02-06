const {
    Op
} = require("sequelize");
const db = require("../models");
const {
    faker
} = require('@faker-js/faker');
const {
    generateCategories,
    generateUserId,
    generateLongDescription
} = require("../utils/generateData");
require('dotenv').config();

const getBlogByCategories = async (req, res) => {
    let blogsWithCategories;
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
            blogsWithCategories = await db.Blog.findAll({
                attributes: [
                    'id',
                    'name',
                    'image',
                    'short_description',
                    'updatedAt',
                    [db.sequelize.fn('COUNT', db.sequelize.col('ReviewBlogs.id')), 'review_count'],
                ],
                include: [{
                    model: db.ReviewBlog,
                    as: 'ReviewBlogs',
                    attributes: [],
                    duplicating: false,
                }, {
                    model: db.Category,
                    attributes: [],
                    duplicating: false,
                }],
                limit: size,
                offset,
                group: ['Blog.id'], 
                order: sort
            });
        } else {
            blogsWithCategories = await db.Blog.findAll({
                attributes: [
                    'id',
                    'name',
                    'image',
                    'short_description',
                    'updatedAt',
                    [db.sequelize.fn('COUNT', db.sequelize.col('ReviewBlogs.id')), 'review_count'],
                ],
                include: [{
                    model: db.ReviewBlog,
                    as: 'ReviewBlogs',
                    attributes: [],
                    duplicating: false,
                }, {
                    model: db.Category,
                    attributes: [],
                    where: {
                        id: {
                            [Op.in]: categoryIds,
                        },
                    },
                    duplicating: false,
                }],
                limit: size,
                offset,
                order: sort
            });
        }
        return res.status(200).json(blogsWithCategories);

    } catch (error) {
        return res.status(401).json(error.message);
    }
}


const generateBlog = async (req, res) => {
    const name = faker.commerce.blogName();
    const short_description = faker.commerce.blogDescription();
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

    try {
        const userOwner = await db.User.findByPk(userId);
        const newBlog = await db.Blog.create(data);
        await newBlog.addCategories(categories);
        await newBlog.setUser(userOwner);

        return res.status(201).json(newBlog);
    } catch (e) {
        return res.status(401).json(e.message);

    }
}

module.exports = {
    generateBlog,
    getBlogByCategories
}