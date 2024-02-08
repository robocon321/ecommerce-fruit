const { addNewUserService } = require('../services/user.service');

const addNewUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const response = addNewUserService(username, password);
    res.status(response.status).json(response.data);    
};

module.exports = {
    addNewUser,
}