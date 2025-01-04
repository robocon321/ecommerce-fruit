const { faker } = require("@faker-js/faker");
const db = require("../models");

const generateCategories = async () => {
    let categories = [];

    let count = faker.number.int({
        min: 1,
        max: 3
    });

    while (count > 0) {
        const categoryIds = (await db.User.findAll({
            attributes: ['id']
        })).map(item => item.id);
    
        const randomIndex = faker.number.int({
            min: 0,
            max: categoryIds.length - 1
        });
    
        const randomCategoryId = categoryIds[randomIndex];
    
        if (categories.some(item => item.id == randomCategoryId)) continue;
        else {
            const category = await db.Category.findByPk(randomCategoryId);
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

const generateUserId = async () => {
    const userIds = (await db.User.findAll({
        attributes: ['id']
    })).map(item => item.id);

    const randomIndex = faker.number.int({
        min: 0,
        max: userIds.length - 1
    });

    const randomUserId = userIds[randomIndex];
    return randomUserId;
}

const generateProductId = async () => {
    const productIds = (await db.Product.findAll({
        attributes: ['id']
    })).map(item => item.id);

    const randomIndex = faker.number.int({
        min: 0,
        max: productIds.length - 1
    });

    const randomProductId = productIds[randomIndex];
    return randomProductId;
}

const generateBlogId = async () => {
    const blogIds = (await db.Blog.findAll({
        attributes: ['id']
    })).map(item => item.id);

    const randomIndex = faker.number.int({
        min: 0,
        max: blogIds.length - 1
    });

    const randomBlogId = blogIds[randomIndex];
    return randomBlogId;
}

module.exports = {
    generateCategories,
    generateArrayImage,
    generateLongDescription,
    generateUserId,
    generateProductId,
    generateBlogId
}