const db = require("../models");
const {
    faker
} = require('@faker-js/faker');
require('dotenv').config();

const generateProduct = async (req, res) => {
    const name = faker.commerce.productName();
    const short_description = faker.commerce.productDescription();
    const price = faker.number.float({
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
        price,
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
    } catch(e) {
        return res.status(401).json(e.message);

    }  

}

const generateCategories = async () => {
    let categories = [];

    let count = faker.number.int({min: 1, max: 3});

    while(count > 0) {
        let categoryId = faker.number.int({min: 1, max: 11});
        if(categories.some(item => item.id == categoryId)) continue;
        else {
            const category = await db.Category.findByPk(categoryId);
            categories.push(category);
            count --;
        }
    }
    return categories;
}

const generateArrayImage = () => {
    let count = faker.number.int({min: 4, max: 10});
    let images = [];
    while(count > 0) {
        let image = faker.image.urlLoremFlickr({
            category: 'food'
        });
        images.push(image);
        count --;
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
    generateProduct
}