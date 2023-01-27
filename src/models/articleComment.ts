import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";
import { Article } from './article'
import { User } from './user'

export class ArticleComment extends Model<InferAttributes<ArticleComment>, InferCreationAttributes<ArticleComment>>{
    declare articleCommentId: number;
    declare comment: string;
    declare commentDatetime?: Date;
    declare likes: number
}

export function ArticleCommentFactory(sequelize: Sequelize) {
    ArticleComment.init({
        articleCommentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        tableName: 'articleComment',
        freezeTableName: true,
        sequelize
    });
}

export function AssociateArticleComments() {
    Article.hasMany(ArticleComment, {
        foreignKey: {
            name: "articleId",
            allowNull: false
        },
        onDelete: "CASCADE"
    });
    ArticleComment.belongsTo(Article, {
        foreignKey: {
            name: "articleId",
            allowNull: false
        },
        onDelete: "CASCADE"});
    User.hasMany(ArticleComment, {
        foreignKey: {
            name: "userId",
            allowNull: false
        }
    });
    ArticleComment.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false
        }
    })
}