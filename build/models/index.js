"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dadsDB = void 0;
const sequelize_1 = require("sequelize");
// import { UserFactory } from './user'
// import { TweetFactory } from './tweet'
// import { AssociateUserTweets } from './tweet'
const dbName = 'dadsDB';
const username = 'root';
const password = 'Password1!';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});
// TweetFactory(sequelize)
// UserFactory(sequelize)
// AssociateUserTweets()
exports.dadsDB = sequelize;
