"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateArticleComments = exports.ArticleCommentFactory = exports.ArticleComment = void 0;
const sequelize_1 = require("sequelize");
const article_1 = require("./article");
const user_1 = require("./user");
class ArticleComment extends sequelize_1.Model {
}
exports.ArticleComment = ArticleComment;
function ArticleCommentFactory(sequelize) {
    ArticleComment.init({
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
            type: sequelize_1.DataTypes.INTEGER
        }
    }, {
        tableName: 'article_comment',
        freezeTableName: true,
        sequelize
    });
}
exports.ArticleCommentFactory = ArticleCommentFactory;
function AssociateArticleComments() {
    article_1.Article.hasMany(ArticleComment);
    ArticleComment.belongsTo(article_1.Article);
    user_1.User.hasMany(ArticleComment);
    ArticleComment.belongsTo(user_1.User);
}
exports.AssociateArticleComments = AssociateArticleComments;
