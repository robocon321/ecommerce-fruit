const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Blog extends Model {}

    Blog.init({
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
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Blog',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: 'deleteAt'
    });

    return Blog;
}