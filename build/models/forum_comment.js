"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateForumCommentForumUser = exports.ForumCommentFactory = exports.ForumComment = void 0;
const sequelize_1 = require("sequelize");
const forum_1 = require("./forum");
const user_1 = require("./user");
class ForumComment extends sequelize_1.Model {
}
exports.ForumComment = ForumComment;
function ForumCommentFactory(sequelize) {
    ForumComment.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        commentDatetime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        likes: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'forumComment',
        freezeTableName: true,
        sequelize
    });
}
exports.ForumCommentFactory = ForumCommentFactory;
function AssociateForumCommentForumUser() {
    forum_1.Forum.hasMany(ForumComment);
    ForumComment.belongsTo(forum_1.Forum);
    user_1.User.hasMany(ForumComment);
    ForumComment.belongsTo(user_1.User);
}
exports.AssociateForumCommentForumUser = AssociateForumCommentForumUser;
