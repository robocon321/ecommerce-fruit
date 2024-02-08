const Response = require('../dto/response.dto');
const {
    Op
} = require("sequelize");
const db = require("../models");

const getBlogByCategoriesService = async (categoryIds, offset, size, sort) => {
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
        return new Response(200, blogsWithCategories);
    } catch (e) {
        console.error(e.message);
        return new Response(500, "Server have problem");
    }
}

const generateBlogService = async (userId, data, categories) => {
    try {
        const userOwner = await db.User.findByPk(userId);
        const newBlog = await db.Blog.create(data);
        await newBlog.addCategories(categories);
        await newBlog.setUser(userOwner);

        return new Response(201, newBlog);
    } catch (e) {
        console.error(e.message);
        return new Response(500, "Server have problem");
    }
}

module.exports = {
    getBlogByCategoriesService,
    generateBlogService
}