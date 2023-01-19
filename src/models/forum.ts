import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";


export class Forum extends Model<InferAttributes<Forum>, InferCreationAttributes<Forum>>{
    declare id: number;
    declare User_id: number;
    declare topic_heading: string;
    declare topic_body: string;
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
        User_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        topic_heading: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        topic_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'Forum',
        freezeTableName: true,
        sequelize
    });
}