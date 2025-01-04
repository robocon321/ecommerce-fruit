const {
    registerService,
    loginService,
    loadUserService
} = require('../services/auth.service');

const register = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const response = await registerService(username, password);
    res.status(response.status).json(response.data);
};

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    const response = await loginService(username, password);
    res.status(response.status).json(response.data);
};

const loadUser = async (req, res) => {
    const {
        user_id
    } = req;

    const response = await loadUserService(user_id);
    res.status(response.status).json(response.data);
}

module.exports = {
    register,
    login,
    loadUser
}