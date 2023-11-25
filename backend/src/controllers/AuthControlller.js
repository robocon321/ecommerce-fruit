const db = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = db.User;

const register = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    try {
        const user = await User.create({
            username,
            password
        });
        res.status(201).json('Create user successfully!');
    } catch (e) {
        res.status(400).json('User already existed')
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
        res.status(401).json({
            message: 'Invalid credentials'
        });
    } else {
          const token = jwt.sign(
            {
                data: user.id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
            }, 
            process.env.JWT_SECRET,
            { algorithm: 'HS256' }
        );
          res.json({ token });
    }
};


module.exports = {
    register,
    login
}