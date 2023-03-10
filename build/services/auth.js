"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.signUserToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const secret = 'Dads are the best!';
const hashPassword = async (plainTextPassword) => {
    const saltRound = 12;
    const hash = await bcrypt_1.default.hash(plainTextPassword, saltRound);
    return hash;
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainTextPassword, hashPassword) => {
    try {
        return await bcrypt_1.default.compare(plainTextPassword, hashPassword);
    }
    catch (error) {
        console.log(error);
        throw new Error("Error occured while comparing password");
    }
};
exports.comparePasswords = comparePasswords;
const signUserToken = async (user) => {
    try {
        let token = jsonwebtoken_1.default.sign({ userId: user.userId }, secret, { expiresIn: '5hr' });
        return token;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error occured while signing token");
    }
};
exports.signUserToken = signUserToken;
const verifyUser = async (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            let decoded = jsonwebtoken_1.default.verify(token, secret);
            return user_1.User.findByPk(decoded.userId);
        }
        catch (err) {
            console.log(err);
            throw new Error('Error occured while verifying token');
        }
    }
    else {
        return null;
    }
};
exports.verifyUser = verifyUser;
