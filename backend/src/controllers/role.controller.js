const { addNewRoleService } = require("../services/role.service");

const addNewRole = async (req, res) => {
    const { role_name } = req.body;
    const response = await addNewRoleService(role_name);
    res.status(response.status).json(response.data);
}

module.exports = {
    addNewRole
}