const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Product extends Model {}

    Product.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        short_description: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        long_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        real_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        sale_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        images: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Product',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: 'deleteAt'
    });

    return Product;
}