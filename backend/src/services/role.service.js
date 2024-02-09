const db = require("../models");
const Response = require('../dto/response.dto');

const addNewRoleService = async (role_name) => {
    if(role_name != null && role_name != '') {
        try {
            const newRole = await db.Role.create({
                role_name
            });
            return new Response(200, newRole);
        } catch(e) {
            console.error(e);
            return new Response(401,"Role " + role_name + " already existed");
        }

    } else {
        return new Response(401, 'Role name is not blank')
    }
}

module.exports = {
    addNewRoleService
}