const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Cart extends Model {}

    Cart.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }        
    }, {
        sequelize,
        modelName: 'Cart',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    });

    return Cart;
}