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

/* Retrieves profile information */
export const getUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(474).send("You shall not pass! ...sign in to retrieve your profile information.");
    }

    if (user.userId != parseInt(req.params.userId)) {
        return res.status(475).send("No use trying to view what you can't");
    }

    let completeUser: User | null = await User.findByPk(user.userId);
    if (completeUser) {
        let profile = {
            firstName: completeUser.firstName,
            lastName: completeUser.lastName,
            userName: completeUser.userName,
            email: completeUser.email
        };
        res.status(200).json(profile);
    } else {
        res.status(480).send("This user does not exist!");
    }

}

export const loginUser: RequestHandler = async (req, res, next) => {
    // Look up user by their username
    let existingUser: User | null = await User.findOne({ 
        where: { userName: req.body.userName }
    });

    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
        
        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}