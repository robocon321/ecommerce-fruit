const Response = require('../dto/response.dto');
const config = require('../config/sequelize.config');
const db = require('../models')
const jwt = require('jsonwebtoken');

const User = db.User;
const Role = db.Role;
const Product = db.Product;

const registerService = async (username, password) => {
    let error = "";
    if (username == null || username.trim() == "") {
        error += "Username is not blank";
    }
    if (password == null || password == "") {
        error += "Password is not blank";
    }

    if (error == "") {
        try {
            const user = await User.create({
                username,
                password
            });

            const [role, created] = await Role.findOrCreate({
                where: {
                    role_name: 'CLIENT'
                },
            });
            user.addRole(role);

            return new Response(201, 'Create user successfully!');

        } catch (e) {
            console.error(e.message);
            return new Response(400, 'User already existed!');
        }
    } else {
        return new Response(400, error);
    }
}

const loginService = async (username, password) => {
    const user = await User.findOne({
        where: {
            username,
            password
        }
    });
    if (user === null) {
        return new Response(401, 'Invalid credentials');
    } else {
        const token = jwt.sign({
                data: user.id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
            },
            config.app.jwt_secret, {
                algorithm: 'HS256'
            }
        );
        return new Response(200, token);
    }

}

const loadUserService = async (user_id) => {
    const user = await User.findByPk(user_id, {
        include: [{
            model: Role,
            through: 'UserRole',
            as: 'roles',
            attributes: ["id", "role_name"],
            through: {
                attributes: []
            }
        }, {
            model: Product,
            through: 'Wishlist',
            as: 'products_wishlist',
            attributes: ['id', 'name', 'images', 'real_price', 'sale_price', 'stock', 'createdAt'],
            through: {
                attributes: []
            }
        }, {
            model: Product,
            through: 'Cart',
            as: 'products_cart',
            attributes: ['id', 'name', 'images', 'real_price', 'sale_price', 'stock', 'createdAt'],
            through: {
                attributes: ["id", "quantity", "createdAt", "updatedAt"],
                as: "cart_info"
            }
        }],
        attributes: ["id", "username"]
    });

    return new Response(200, user);   
}

module.exports = {
    registerService,
    loginService,
    loadUserService
}