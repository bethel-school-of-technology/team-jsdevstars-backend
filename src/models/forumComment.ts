import { userInfo } from "os";
import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";
import { Forum } from "./forum"; 
import { User } from "./user";


export class ForumComment extends Model<InferAttributes<ForumComment>, InferCreationAttributes<ForumComment>>{
    declare forumCommentId: number;
    declare comment: string;
    declare commentDatetime?: Date;
    declare likes: number
}

export function ForumCommentFactory(sequelize: Sequelize) {
    ForumComment.init({
        forumCommentId: {
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
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'forumComment',
        freezeTableName: true,
        sequelize
    });
}

export function AssociateForumCommentForumUser() {
    Forum.hasMany(ForumComment, {
        foreignKey: {
            name: "forumId",
            allowNull: false
        },
        onDelete: "CASCADE"
    });
    ForumComment.belongsTo(Forum, {
        foreignKey: {
            name: "forumId",
            allowNull: false
        },
        onDelete: "CASCADE"});
    User.hasMany(ForumComment, {
        foreignKey: {
            name: "userId",
            allowNull: false
        }
    });
    ForumComment.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false
        }
    })
}