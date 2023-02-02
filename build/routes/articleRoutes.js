"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("../controllers/articleController");
const router = (0, express_1.Router)();
router.get('/', articleController_1.getAllArticles);
router.post('/', articleController_1.createArticle);
router.get('/:tweetId', articleController_1.getArticle);
router.put('/:tweetId', articleController_1.updateArticle);
router.delete('/:tweetId', articleController_1.deleteArticle);
exports.default = router;
