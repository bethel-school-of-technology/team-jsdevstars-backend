import { RequestHandler } from "express";
import { User } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = await User.create(req.body);

    try {
        if (newUser.userName && newUser.password && newUser.firstName && newUser.lastName) {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await newUser.save();
            res.status(201).json({
                username: created.userName,
                userId: created.userId,
                firstname: created.firstName,
                lastname: created.lastName
            });
        }
        else {
            res.status(460).send('Username, password, and full name required');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
}

export const loginUser: RequestHandler = async (req, res, next) => {

}