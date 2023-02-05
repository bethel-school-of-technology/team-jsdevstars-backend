"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.loginUser = exports.getUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const createUser = async (req, res, next) => {
    let newUser = await user_1.User.create(req.body);
    try {
        if (newUser.firstName && newUser.lastName && newUser.userName && newUser.email && newUser.password) {
            let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
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
};
exports.createUser = createUser;
/* Retrieves profile information */
const getUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(474).send("You shall not pass! ...sign in to retrieve your profile information.");
    }
    if (user.userId != parseInt(req.params.userId)) {
        return res.status(475).send("No use trying to view what you can't");
    }
    let completeUser = await user_1.User.findByPk(user.userId);
    if (completeUser) {
        let profile = {
            firstName: completeUser.firstName,
            lastName: completeUser.lastName,
            userName: completeUser.userName,
            email: completeUser.email,
            password: completeUser.password
        };
        res.status(200).json(profile);
    }
    else {
        res.status(480).send("This user does not exist!");
    }
};
exports.getUser = getUser;
const loginUser = async (req, res, next) => {
    // Look up user by their username
    let existingUser = await user_1.User.findOne({
        where: { email: req.body.email,
            inactive: 0
        }
    });
    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
};
exports.loginUser = loginUser;
// export const editUser: RequestHandler = async (req, res, next) => {
//     let user: User | null = await verifyUser(req);
//     if (!user) {
//         return res.status(474).send("You shall not pass! ...sign in to retrieve your profile information.");
//     };
//     if (user.userId != parseInt(req.params.userId)) {
//         return res.status(475).send("No use trying to view what you can't");
//     };
//     let userId = req.params.userId
//     let updateUser: User = req.body
//     let userFound: User | null = await User.findByPk(userId);
//     // if (
//     //     userFound && userFound.userId == updateUser.userId 
//     //     // && updateUser.firstName && updateUser.lastName 
//     //     // && updateUser.userName && updateUser.email && updateUser.password 
//     // ) 
//     // if (updateUser.firstName && updateUser.lastName && updateUser.userName && updateUser.email && updateUser.password ) {
//     //         let hashedPassword = await hashPassword(updateUser.password);
//     //         updateUser.password = hashedPassword;
//     //         let updated = await updateUser.save();
//     //         res.status(201).json({
//     //             firstname: updated.firstName,
//     //             lastname: updated.lastName,
//     //             username: updated.userName,
//     //             email: updated.email,
//     //             password: updated.password
//     //         });
//     // }
//     // else {
//     //         res.status(460).send('Username, password, email and full name required');
//     // }
//     // catch (err) {
//     //     res.status(500).send(err);
//     // }
//     if  
//     (await User.update(updateUser, {
//         where: { userId: userId }
//     }))
//         res.status(200).json('You are truly successful')
//      else {
//         res.status(408).json('Bing Bang')
//     }
// }
/* Deletes user */
const deleteUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(462).send("You shall not pass! ...sign in to delete your profile.");
    }
    let userId = parseInt(req.params.userId);
    // Check if the current user owns the profile to be deleted
    let userProfile = await user_1.User.findByPk(userId);
    if (userProfile.userId != user.userId) {
        return res.status(481).send("This is murder!");
    }
    let deleted = await user_1.User.update({ inactive: true }, {
        where: { userId: userId }
    });
    if (deleted) {
        res.status(200).send('Sad to see you go');
    }
    else {
        res.status(482).render('You can check out any time, but you can never leave');
    }
};
exports.deleteUser = deleteUser;
