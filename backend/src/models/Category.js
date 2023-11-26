const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Category extends Model {}

    Category.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false            
        }
    }, {
        sequelize,
        modelName: 'Category',
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        deletedAt: 'deleteAt'
    });

    return Category;
}