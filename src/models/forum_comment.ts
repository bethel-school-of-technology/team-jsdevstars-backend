import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";


export class ForumComment extends Model<InferAttributes<ForumComment>, InferCreationAttributes<ForumComment>>{
    declare id: number;
    declare User_id: number;
    declare Forum_id: number;
    declare comment: string;
    declare comment_datetime?: Date;
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
        User_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Forum_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment_datetime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        likes: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'Forum_comment',
        freezeTableName: true,
        sequelize
    });
}