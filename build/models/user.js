"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function UserFactory(sequelize) {
    User.init({
        userId: {
            type: sequelize_2.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: sequelize_2.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_2.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_2.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_2.DataTypes.NOW,
        },
        admin: {
            type: sequelize_2.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        inactive: {
            type: sequelize_2.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        sequelize
    });
}
exports.UserFactory = UserFactory;
