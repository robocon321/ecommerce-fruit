const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});    

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

db.User.belongsToMany(db.Role, {
    foreignKey: 'role_id',
    through: 'UserRole',
});

db.Role.belongsToMany(db.User, {
    foreignKey: 'user_id',
    through: 'UserRole'
});

db.User.hasMany(db.Product, {
    foreignKey: 'user_id'
});

db.Product.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user'
});

db.Product.belongsToMany(db.Category, {
    foreignKey: 'category_id',
    through: 'ProductCategories',
    timestamps: false,
    as: 'categories'
});

db.Category.belongsToMany(db.Product, {
    foreignKey: 'product_id',
    through: 'ProductCategories',
    timestamps: false,
    as: 'products'
});

db.Product.hasMany(db.ReviewProduct, {
    foreignKey: 'product_id',
    as: 'reviews'
});
db.ReviewProduct.belongsTo(db.Product, {
    foreignKey: 'product_id'
});

db.User.hasMany(db.ReviewProduct, {
    foreignKey: 'user_id'
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
    foreignKey: 'category_id',
    through: 'BlogCategories',
    timestamps: false
});

db.Category.belongsToMany(db.Blog, {
    foreignKey: 'blog_id',
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


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db
