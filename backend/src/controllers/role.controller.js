const db = require("../models");

const addNewRole = async (req, res) => {
    const { role_name } = req.body;
    if(role_name != null && role_name != '') {
        try {
            const newRole = await db.Role.create({
                role_name
            });
            return res.status(200).json(newRole);
        } catch(e) {
            return res.status(401).json(e.message);
        }

    } else {
        return res.status(401).json('Role name is not blank');
    }
}

module.exports = {
    addNewRole
}