const {
    DataTypes,
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Order extends Model {}

    Order.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('CREATED', 'CONFIRMED', 'SHIPPING', 'CANCELLED', 'COMPLETE'),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Order',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: 'deletedAt'
    });

    return Order;
}