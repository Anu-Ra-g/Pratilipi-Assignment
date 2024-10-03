const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    inventory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, // Ensure inventory is at least 1
        },
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
});

module.exports = { Product };  
