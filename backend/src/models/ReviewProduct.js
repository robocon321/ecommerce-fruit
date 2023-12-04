const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class ReviewProduct extends Model {}

    ReviewProduct.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        star: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ReviewProduct',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: 'deleteAt'
    });

    return ReviewProduct;
}