const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Wishlist extends Model {}

    Wishlist.init({
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
        }
    }, {
        sequelize,
        modelName: 'Wishlist',
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });

    return Wishlist;
}