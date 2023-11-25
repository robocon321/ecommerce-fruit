const db = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = db.User;

const register = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    let error = "";
    if(username == null || username.trim() == "") {
        error += "Username is not blank";      
    }
    if(password == null || password == "") {
        error += "Password is not blank";      
    }

    if(error == "") {
        try {
            const user = await User.create({
                username,
                password
            });
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