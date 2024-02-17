const Response = require('../dto/response.dto');
const config = require('../config/sequelize.config');
const db = require('../models')
const jwt = require('jsonwebtoken');
const {
    usernamesUniqueSetKey,
    usersHashKey,
    usernamesScoreKey
} = require('../utils/key.redis');
const client = require('../connect/redis.connect');

const User = db.User;
const Role = db.Role;
const Product = db.Product;

const registerService = async (username, password) => {
    let error = "";
    if (username == null || username.trim() == "") {
        error += "Username is not blank";
    }
    if (password == null || password == "") {
        error += "Password is not blank";
    }

    if (error == "") {
        return await db.sequelize.transaction({
            autocommit: false
        }).
        then(async (t) => {
            try {
                // check existed username in cache
                const existedCache = await client.sIsMember(usernamesUniqueSetKey(), username);
                if (existedCache) return new Response(400, 'User already existed!');

                // store to database
                const user = await User.create({
                    username,
                    password
                }, {
                    transaction: t
                });

                const [role, created] = await Role.findOrCreate({
                    where: {
                        role_name: 'CLIENT'
                    },
                    transaction: t
                });
                user.addRole(role);

                await t.commit();

                // store to cache
                await client.sAdd(usernamesUniqueSetKey(), username);
                await client.zAdd(usernamesScoreKey(), {
                    value: username,
                    score: user.id
                });
                await client.hSet(usersHashKey(user.id), {
                    ...user.dataValues,
                    roles: JSON.stringify([role.dataValues])
                });

                return new Response(201, 'Create user successfully!');

            } catch (e) {
                await t.rollback();
                console.error(e);
                return new Response(400, 'User already existed!');
            }
        })
    } else {
        return new Response(400, error);
    }
}

const loginService = async (username, password) => {
    const exists = await client.sIsMember(usernamesUniqueSetKey(), username);
    if (exists) {
        const user_id = await client.zScore(usernamesScoreKey(), username);
        const token = jwt.sign({
                data: user_id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
            },
            config.app.jwt_secret, {
                algorithm: 'HS256'
            }
        );
        return new Response(200, token);
    } else {
        const user = await User.findOne({
            where: {
                username,
                password
            }
        });
        if (user === null) {
            return new Response(401, 'Invalid credentials');
        } else {
            const token = jwt.sign({
                    data: user.id,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 2),
                },
                config.app.jwt_secret, {
                    algorithm: 'HS256'
                }
            );
            return new Response(200, token);
        }
    }
}

const loadUserService = async (user_id) => {
    let user = await client.hGetAll(usersHashKey(user_id));
    if (Object.keys(user).length !== 0) {        
        return new Response(200, {
            ...user,
            roles: JSON.parse(user.roles),
            products_wishlist: [],
            products_cart: []
        });
    } else {
        user = await User.findByPk(user_id, {
            include: [{
                model: Role,
                through: 'UserRole',
                as: 'roles',
                attributes: ["id", "role_name"],
                through: {
                    attributes: []
                }
            }, {
                model: Product,
                through: 'Wishlist',
                as: 'products_wishlist',
                attributes: ['id', 'name', 'images', 'real_price', 'sale_price', 'stock', 'createdAt'],
                through: {
                    attributes: []
                }
            }, {
                model: Product,
                through: 'Cart',
                as: 'products_cart',
                attributes: ['id', 'name', 'images', 'real_price', 'sale_price', 'stock', 'createdAt'],
                through: {
                    attributes: ["id", "quantity", "createdAt", "updatedAt"],
                    as: "cart_info"
                }
            }],
            attributes: ["id", "username"]
        });
    }

    return new Response(200, user);
}

const loadUserFromDatabaseToCacheService = async () => {
    const users = await User.findAll({
        include: {
            model: Role,
            through: 'UserRole',
            as: 'roles',
            attributes: ["id", "role_name"],
            through: {
                attributes: []
            }
        }
    });
    
    await Promise.all(users.map(async (user) => {
        const currentUser = user.dataValues;
        const currentRoles = currentUser.roles.map(role => role.dataValues);
        delete currentUser.roles;
    
        const userSetPromise = client.sAdd(usernamesUniqueSetKey(), currentUser.username);
        const userScorePromise = client.zAdd(usernamesScoreKey(), {
            value: currentUser.username,
            score: currentUser.id
        });
        const userHashPromise = client.hSet(usersHashKey(currentUser.id), {
            ...currentUser,
            roles: JSON.stringify(currentRoles)
        });
    
        await Promise.all([userSetPromise, userScorePromise, userHashPromise]);
    }));    
    // let currentUser = null;
    // let currentRoles = null;

    // for(let i = 0 ; i < users.length ; i ++) {
    //     currentUser = users[i].dataValues;
    //     currentRoles = currentUser.roles.map(role => role.dataValues);
    //     delete currentUser.roles;

    //     const userSetPromise = client.sAdd(usernamesUniqueSetKey(), currentUser.username);
    //     const userScorePromise = client.zAdd(usernamesScoreKey(), {
    //         value: currentUser.username,
    //         score: currentUser.id
    //     });
    //     const userHashPromise = client.hSet(usersHashKey(currentUser.id), {
    //         ...currentUser,
    //         roles: JSON.stringify(currentRoles)
    //     });

    //     await Promise.all([userSetPromise, userScorePromise, userHashPromise]);
    // }    
}

module.exports = {
    registerService,
    loginService,
    loadUserService,
    loadUserFromDatabaseToCacheService
}