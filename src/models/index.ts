import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { ArticleFactory, AssociateUserArticles } from "./article";
import { ArticleCommentFactory, AssociateArticleComments } from "./articleComment";
import { AssociateForumUser, ForumFactory } from "./forum";
import { AssociateForumCommentForumUser, ForumCommentFactory } from "./forum_comment";

const dbName = 'fordadsdb';
const username = 'fordads';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'db4free.net',
    port: 3306,
    dialect: 'mysql'
});

ArticleFactory(sequelize);
ArticleCommentFactory(sequelize);
ForumFactory(sequelize);
ForumCommentFactory(sequelize);
UserFactory(sequelize);
AssociateUserArticles();
AssociateArticleComments();
AssociateForumUser();
AssociateForumCommentForumUser();

export const db = sequelize;