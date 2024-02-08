const { addNewCategoryService, getCategoriesService } = require("../services/category.service");

const addNewCategory = async (req, res) => {
    const {
        name,
        image
    } = req.body;

    const response = await addNewCategoryService(name, image);
    res.status(response.status).json(response.data);
}

const getCategories = async (req, res) => {
    const response = await getCategoriesService();
    res.status(response.status).json(response.data);
}

module.exports = {
    addNewCategory,
    getCategories
}