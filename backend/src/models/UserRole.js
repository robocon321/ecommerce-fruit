const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class UserRole extends Model {}

    UserRole.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User', // 'Movies' would also work
                key: 'id'
            }
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Role', // 'Actors' would also work
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'UserRole',
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });

    return UserRole;
}