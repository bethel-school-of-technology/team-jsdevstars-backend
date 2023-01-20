import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";


export class Forum extends Model<InferAttributes<Forum>, InferCreationAttributes<Forum>>{
    declare id: number;
    declare userId: number;
    declare topicHeading: string;
    declare topicBody: string;
    declare createdAt?: Date;
}

export function ForumFactory(sequelize: Sequelize) {
    Forum.init({
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
        topicHeading: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        topicBody: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'forum',
        freezeTableName: true,
        sequelize
    });
}