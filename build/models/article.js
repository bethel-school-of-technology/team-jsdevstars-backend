"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserArticles = exports.ArticleFactory = exports.Article = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Article extends sequelize_1.Model {
}
exports.Article = Article;
function ArticleFactory(sequelize) {
    Article.init({
        articleId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        freezeTableName: true,
        tableName: 'articles',
        sequelize
    });
}
exports.ArticleFactory = ArticleFactory;
function AssociateUserArticles() {
    user_1.User.hasMany(Article);
    Article.belongsTo(user_1.User);
}
exports.AssociateUserArticles = AssociateUserArticles;
