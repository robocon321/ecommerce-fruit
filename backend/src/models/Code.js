const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Code extends Model {}

    Code.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,            
        }
    }, {
        sequelize,
        modelName: 'Code',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: 'deletedAt'
    });

    return Code;
}