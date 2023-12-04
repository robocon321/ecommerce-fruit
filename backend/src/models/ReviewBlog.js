const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class ReviewBlog extends Model {}

    ReviewBlog.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'ReviewBlog',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: 'deleteAt'
    });

    return ReviewBlog;
}