const {
    Sequelize,
    DataTypes
} = require('sequelize');

const sequelize = require('../connect/sequelize.connect.js');

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./User.js')(sequelize, DataTypes);
db.Role = require('./Role.js')(sequelize, DataTypes);
db.UserRole = require('./UserRole.js')(sequelize, DataTypes);
db.Product = require('./Product.js')(sequelize, DataTypes);
db.Category = require('./Category.js')(sequelize, DataTypes);
db.ReviewProduct = require('./ReviewProduct.js')(sequelize, DataTypes);
db.Blog = require('./Blog.js')(sequelize, DataTypes);
db.ReviewBlog = require('./ReviewBlog.js')(sequelize, DataTypes);
db.Wishlist = require('./Wishlist.js')(sequelize, DataTypes);
db.Cart = require('./Cart.js')(sequelize, DataTypes);
db.Order = require('./Order.js')(sequelize, DataTypes);
db.OrderDetail = require('./OrderDetail.js')(sequelize, DataTypes);
db.Code = require('./Code.js')(sequelize, DataTypes);

db.User.belongsToMany(db.Role, {
    foreignKey: 'user_id',
    through: 'UserRole',
    as: 'roles'
});

db.Role.belongsToMany(db.User, {
    foreignKey: 'role_id',
    through: 'UserRole',
    as: 'users'
});

db.User.hasMany(db.Product, {
    foreignKey: 'user_id'
});

db.Product.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user'
});

db.Product.belongsToMany(db.Category, {
    foreignKey: 'product_id',
    through: 'ProductCategories',
    timestamps: false,
    as: 'categories'
});

db.Category.belongsToMany(db.Product, {
    foreignKey: 'category_id',
    through: 'ProductCategories',
    timestamps: false,
    as: 'products'
});

db.Product.hasMany(db.ReviewProduct, {
    foreignKey: 'product_id',
    as: 'reviews'
});
db.ReviewProduct.belongsTo(db.Product, {
    foreignKey: 'product_id',
    as: 'product'
});

db.User.hasMany(db.ReviewProduct, {
    foreignKey: 'user_id',
    as: 'reviews'
});
db.ReviewProduct.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user'
});

db.User.hasMany(db.Blog, {
    foreignKey: 'user_id'
});
db.Blog.belongsTo(db.User, {
    foreignKey: 'user_id'
});

db.Blog.belongsToMany(db.Category, {
    foreignKey: 'blog_id',
    through: 'BlogCategories',
    timestamps: false
});

db.Category.belongsToMany(db.Blog, {
    foreignKey: 'category_id',
    through: 'BlogCategories',
    timestamps: false
});

db.Blog.hasMany(db.ReviewBlog, {
    foreignKey: 'blog_id'
});
db.ReviewBlog.belongsTo(db.Blog, {
    foreignKey: 'blog_id'
});

db.User.hasMany(db.ReviewBlog, {
    foreignKey: 'user_id'
});
db.ReviewBlog.belongsTo(db.User, {
    foreignKey: 'user_id'
});


db.User.belongsToMany(db.Product, {
    foreignKey: 'user_id',
    through: 'Wishlist',
    as: 'products_wishlist'
});
db.Product.belongsToMany(db.User, {
    foreignKey: 'product_id',
    through: 'Wishlist',
    as: 'users_wishlist'
});

db.User.belongsToMany(db.Product, {
    foreignKey: 'user_id',
    through: 'Cart',
    as: 'products_cart'
});
db.Product.belongsToMany(db.User, {
    foreignKey: 'product_id',
    through: 'Cart',
    as: 'users_cart'
});


db.Order.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user'
});
db.User.hasMany(db.Order, {
    foreignKey: 'user_id',
    as: 'orders'
});

db.Order.hasMany(db.OrderDetail, {
    foreignKey: 'order_id',
    as: 'order'
});
db.OrderDetail.belongsTo(db.Order, {
    foreignKey: 'order_id',
    as: 'o_order_details'
});

db.Product.hasMany(db.OrderDetail, {
    foreignKey: 'product_id',
    as: 'product'
});
db.OrderDetail.belongsTo(db.Product, {
    foreignKey: 'product_id',
    as: 'p_order_details'
});

db.sequelize.sync({
        force: false
    })
    .then(() => {
        console.log('yes re-sync done!')
    })


module.exports = db