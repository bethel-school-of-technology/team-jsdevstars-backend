import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";


export class ForumComment extends Model<InferAttributes<ForumComment>, InferCreationAttributes<ForumComment>>{
    declare id: number;
    declare userId: number;
    declare forumId: number;
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        forumId: {
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
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'forumComment',
        freezeTableName: true,
        sequelize
    });
}