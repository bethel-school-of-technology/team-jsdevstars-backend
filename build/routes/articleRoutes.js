"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleController_1 = require("../controllers/articleController");
const router = (0, express_1.Router)();
router.get('/', articleController_1.getAllArticles);
router.post('/', articleController_1.createArticle);
router.get('/:articleId', articleController_1.getArticleById);
router.put('/:articleId', articleController_1.editArticle);
router.delete('/:articleId', articleController_1.deleteArticle);
// Comments
// router.get('/', getAllArticleComment);
router.post('/:articleId', articleController_1.createArticleComment);
router.get('/:articleId/:articleCommentId', articleController_1.getArticleCommentById);
router.put('/:articleId/:articleCommentId', articleController_1.editArticleComment);
router.delete('/:articleId/:articleCommentId', articleController_1.deleteArticleComment);
exports.default = router;
