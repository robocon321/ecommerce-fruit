const db = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = db.User;
const Role = db.Role;

const addNewUser = async (req, res) => {
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

            const [role, created] = await Role.findOrCreate({
                where: { role_name: 'ADMIN' },
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

module.exports = {
    addNewUser
}