import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";
import { Article } from './article'
import { User } from './user'

export class ArticleComment extends Model<InferAttributes<ArticleComment>, InferCreationAttributes<ArticleComment>>{
    declare id: number;
    declare userId: number;
    declare articleId: number;
    declare comment: string;
    declare commentDatetime?: Date;
    declare likes: number
}

export function ArticleCommentFactory(sequelize: Sequelize) {
    ArticleComment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        articleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commentDatetime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        likes: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'article_comment',
        freezeTableName: true,
        sequelize
    });
}

export function AssociateArticleCommentArticleUser() {
    Article.hasMany(ArticleComment, { foreignKey: 'articleId' });
    ArticleComment.belongsTo(User, {foreignKey: 'userId' })
}