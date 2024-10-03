const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['USER', 'ADMIN']], 
        },
    } 
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
