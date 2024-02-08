const db = require('../models')
const Response = require('../dto/response.dto');

const User = db.User;
const Role = db.Role;

const addNewUserService = async (username, password) => {
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
            
            return new Response(201, 'Create user successfully!');
        } catch (e) {
            console.error(e.message);
            return new Response(400, 'User already existed');
        }    
    } else {
        return new Response(400, error);   
    }
};

module.exports = {
    addNewUserService
}