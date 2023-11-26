const db = require('../models')

async function adminRoleMiddleware(req, res, next) {
    const user = await db.User.findByPk(req.user_id, {
        include: [{
            model: db.Role,
            through: 'UserRole'
        }]
    });
    const roles = user.Roles.map(item => item.role_name);
    if (roles.some(item => item == 'ADMIN')) {
        next();
    } else {
        return res.status(403).json('Your account dont have permission');
    }
}

module.exports = adminRoleMiddleware;
