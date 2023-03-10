import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";
import { User } from "./user"; 


export class Forum extends Model<InferAttributes<Forum>, InferCreationAttributes<Forum>>{
    declare forumId: number;
    declare topicHeading: string;
    declare topicBody: string;
    declare createdAt?: Date;
    declare userId: ForeignKey<User['userId']>;
}

export function ForumFactory(sequelize: Sequelize) {
    Forum.init({
        forumId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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

export function AssociateForumUser() {
    User.hasMany(Forum, {
        foreignKey: {
            name: 'userId',
            allowNull: false
        }
    });
    Forum.belongsTo(User, {
        foreignKey: {
            name: 'userId',
            allowNull: false
        }
    })
}