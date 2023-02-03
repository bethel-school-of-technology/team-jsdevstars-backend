import { createDecipheriv } from "crypto";
import { RequestHandler } from "express";
import { User } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = await User.create(req.body);

    try {
        if (newUser.firstName && newUser.lastName && newUser.userName && newUser.email && newUser.password ) {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await newUser.save();
            res.status(201).json({
                firstname: created.firstName,
                lastname: created.lastName,
                username: created.userName,
                email: created.email,
                password: created.password
            });
        }
        else {
            res.status(460).send('Username, password, email and full name required');
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
            email: completeUser.email,
            password: completeUser.password
        };
        res.status(200).json(profile);
    } else {
        res.status(480).send("This user does not exist!");
    }

}

export const loginUser: RequestHandler = async (req, res, next) => {
    // Look up user by their username
    let existingUser: User | null = await User.findOne({ 
        where: { email: req.body.email }
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

export const editUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(474).send("You shall not pass! ...sign in to retrieve your profile information.");
    };

    if (user.userId != parseInt(req.params.userId)) {
        return res.status(475).send("No use trying to view what you can't");
    };

    let userId = req.params.userId
    let updateUser: User = req.body

    let userFound: User | null = await User.findByPk(userId);
    
    // if (
    //     userFound && userFound.userId == updateUser.userId 
        
    //     // && updateUser.firstName && updateUser.lastName 
    //     // && updateUser.userName && updateUser.email && updateUser.password 
    // ) 
    
    if  (await User.update(updateUser, {
        where: { userId: userId }
    }))
         
        res.status(200).json('You are truly successful')
     else {
        res.status(408).json('Bing Bang')
    }

}