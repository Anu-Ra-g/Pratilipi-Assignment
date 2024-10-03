const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config');

class Order extends Model {}
class Catalog extends Model{}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    totalprice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
});

Catalog.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Catalog',
    tableName: 'catalog',
});

module.exports = { Order,  Catalog };
