import { userInfo } from "os";
import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";
import { Forum } from "./forum"; 
import { User } from "./user";


export class ForumComment extends Model<InferAttributes<ForumComment>, InferCreationAttributes<ForumComment>>{
    declare id: number;
    declare comment: string;
    declare commentDatetime?: Date;
    declare likes: number
}

export function ForumCommentFactory(sequelize: Sequelize) {
    ForumComment.init({
        id: {
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
    Forum.hasMany(ForumComment);
    ForumComment.belongsTo(Forum);
    User.hasMany(ForumComment);
    ForumComment.belongsTo(User)
}