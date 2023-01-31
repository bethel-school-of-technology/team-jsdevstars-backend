"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getPublicUserTweets, getloggedinTweets } from '../controllers/tweetController';
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/', userController_1.createUser);
router.post('/login', userController_1.loginUser);
// router.get('/:userId', getUser);
// correct path in postman
// router.get('/:userId', getUserComments);
// not working in postman
// router.get('/getLoggedinTweets', getloggedinTweets)
// router.get('/logged/:userId', getloggedinTweets)
exports.default = router;
