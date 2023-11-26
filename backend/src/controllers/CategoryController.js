const db = require("../models");

const addNewCategory = async (req, res) => {
    const {
        name,
        image
    } = req.body;
    let error = "";

    if (name == null || name.trim() == '') {
        error += 'Category name is not blank';
    }

    if (image == null || image.trim() == '') {
        error += 'Category image is not blank';
    }

    if (error == '') {
        try {
            const newCategory = await db.Category.create({
                name, image
            });
            return res.status(200).json(newCategory);
        } catch (e) {
            return res.status(401).json(e.message);
        }

    } else {
        return res.status(401).json(error);
    }
}

const getCategories = async (req, res) => {
    try {
        const users = await db.Category.findAll();
        return res.status(200).json(users);
    } catch(e) {
        return res.status(500).json("Server have problem");
    }
}

module.exports = {
    addNewCategory,
    getCategories
}