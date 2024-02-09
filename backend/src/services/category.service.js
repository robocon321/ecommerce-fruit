const db = require("../models");
const Response = require('../dto/response.dto');

const addNewCategoryService = async (name, image) => {
    let error = "";

    if (name == null || name.trim() == '') {
        error += 'Category name is not blank';
    }

    if (image == null || image.trim() == '') {
        error += 'Category image is not blank';
    }

    if (error == '') {
        try {
            const user = await db.User.findByPk(req.user_id, {
                include: [{
                    model: db.Role,
                    through: 'UserRole'
                }]
            });
            const roles = user.Roles.map(item => item.role_name);
            if (roles.some(item => item == 'ADMIN')) {
                const newCategory = await db.Category.create({
                    name,
                    image
                });
                return new Response(200, newCategory);
            } else {
                return new Response(403, 'Your account dont have permission');
            }

        } catch (e) {
            console.error(e);
            return new Response(500, "Server have problem");
        }

    } else {
        return new Response(401, error);
    }
}

const getCategoriesService = async () => {
    try {
        const categories = await db.Category.findAll();
        return new Response(200, categories);
    } catch (e) {
        console.error(e.message);
        return new Response(500, "Server have problem");
    }
}

module.exports = {
    addNewCategoryService,
    getCategoriesService
}