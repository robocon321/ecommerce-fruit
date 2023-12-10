const db = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = db.User;
const Role = db.Role;
const Product = db.Product;

const register = async (req, res) => {
    const {
        username,
        password
    } = req.body;
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

            res.status(201).json('Create user successfully!');
        } catch (e) {
            res.status(400).json('User already existed');
        }
    } else {
        res.status(400).json(error);
    }
};

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;


    const user = await User.findOne({
        where: {
            username,
            password
        }
    });
    if (user === null) {
        res.status(401).json('Invalid credentials');
    } else {
        const token = jwt.sign({
                data: user.id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
            },
            process.env.JWT_SECRET, {
                algorithm: 'HS256'
            }
        );
        res.json({
            token
        });
    }
};

const loadUser = async (req, res) => {
    const { user_id } = req;

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

    return res.status(200).json(user);
}

module.exports = {
    register,
    login,
    loadUser
}