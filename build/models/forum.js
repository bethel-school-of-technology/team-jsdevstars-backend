"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateForumUser = exports.ForumFactory = exports.Forum = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Forum extends sequelize_1.Model {
}
exports.Forum = Forum;
function ForumFactory(sequelize) {
    Forum.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        topicHeading: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        topicBody: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        tableName: 'forum',
        freezeTableName: true,
        sequelize
    });
}
exports.ForumFactory = ForumFactory;
function AssociateForumUser() {
    user_1.User.hasMany(Forum);
    Forum.belongsTo(user_1.User);
}
exports.AssociateForumUser = AssociateForumUser;
