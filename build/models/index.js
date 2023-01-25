"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const article_1 = require("./article");
const articleComment_1 = require("./articleComment");
const forum_1 = require("./forum");
const forum_comment_1 = require("./forum_comment");
const dbName = 'fordadsdb';
const username = 'fordads';
const password = 'Password1!';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'db4free.net',
    port: 3306,
    dialect: 'mysql'
});
(0, article_1.ArticleFactory)(sequelize);
(0, articleComment_1.ArticleCommentFactory)(sequelize);
(0, forum_1.ForumFactory)(sequelize);
(0, forum_comment_1.ForumCommentFactory)(sequelize);
(0, user_1.UserFactory)(sequelize);
(0, article_1.AssociateUserArticles)();
(0, articleComment_1.AssociateArticleComments)();
(0, forum_1.AssociateForumUser)();
(0, forum_comment_1.AssociateForumCommentForumUser)();
exports.db = sequelize;
