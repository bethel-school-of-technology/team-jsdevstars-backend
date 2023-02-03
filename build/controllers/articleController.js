"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleComment = exports.editArticleComment = exports.createArticleComment = exports.getArticleCommentById = exports.deleteArticle = exports.editArticle = exports.createArticle = exports.getArticleById = exports.getAllArticles = void 0;
const article_1 = require("../models/article");
const articleComment_1 = require("../models/articleComment");
const auth_1 = require("../services/auth");
/* Retrieves list of all articles */
const getAllArticles = async (req, res, next) => {
    let articleList = await article_1.Article.findAll();
    res.status(200).json(articleList);
};
exports.getAllArticles = getAllArticles;
/* Retrieves a single article along with all associated article comments */
const getArticleById = async (req, res, next) => {
    let articleId = parseInt(req.params.articleId);
    let article = await article_1.Article.findByPk(articleId);
    if (article) {
        let articleCommentList = await articleComment_1.ArticleComment.findAll({ where: { articleId: articleId } });
        let packet = {
            article: article,
            comments: articleCommentList
        };
        res.status(200).json(packet);
    }
    else {
        res.status(450).send("These are not the articles you are looking for.");
    }
};
exports.getArticleById = getArticleById;
/* Creates a new article */
const createArticle = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(451).send("You shall not pass! ...sign in to create a article.");
    }
    const newArticle = article_1.Article.build(req.body);
    newArticle.userId = user.userId;
    await newArticle.save();
    if (newArticle) {
        res.status(200).json(newArticle);
    }
    else {
        res.status(452).send("No go.");
    }
};
exports.createArticle = createArticle;
/* Edits a article */
const editArticle = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(457).send("You shall not pass! ...sign in to edit your article.");
    }
    let articleId = parseInt(req.params.articleId);
    // Check if the current user is the author of the article
    let article = await article_1.Article.findByPk(articleId);
    if (article.userId != user.userId) {
        return res.status(463).send("Thou shalt not edit thy neighbor's article.");
    }
    const editedArticle = req.body;
    editedArticle.userId = user.userId;
    let [updated] = await article_1.Article.update(editedArticle, {
        where: { articleId: articleId }
    });
    if (updated === 1) {
        let article = await article_1.Article.findByPk(articleId);
        res.status(200).json(article);
    }
    else {
        res.status(459).send('Update failed');
    }
};
exports.editArticle = editArticle;
/* Deletes article */
const deleteArticle = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(462).send("You shall not pass! ...sign in to delete an article.");
    }
    let articleId = parseInt(req.params.articleId);
    // Check if the current user is the author of the article
    let article = await article_1.Article.findByPk(articleId);
    if (article.userId != user.userId) {
        return res.status(464).send("Did you have something against the author of this article?");
    }
    let deleted = await article_1.Article.destroy({
        where: { articleId: articleId }
    });
    if (deleted) {
        res.status(200).send('You are truly successful');
    }
    else {
        res.status(460).send('Deletion failed');
    }
};
exports.deleteArticle = deleteArticle;
// Comments
/* Retrieves a single article comment */
const getArticleCommentById = async (req, res, next) => {
    let articleCommentId = parseInt(req.params.articleCommentId);
    let articleComment = await articleComment_1.ArticleComment.findByPk(articleCommentId);
    if (articleComment) {
        res.status(200).json(articleComment);
    }
    else {
        res.status(465).send("These are not the article comments you are looking for.");
    }
};
exports.getArticleCommentById = getArticleCommentById;
/* Creates a new article comment */
const createArticleComment = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(467).send("You shall not pass! ...sign in to comment on an article.");
    }
    const newArticleComment = articleComment_1.ArticleComment.build(req.body);
    newArticleComment.userId = user.userId;
    newArticleComment.articleId = parseInt(req.params.articleId);
    await newArticleComment.save();
    if (newArticleComment) {
        res.status(200).json(newArticleComment);
    }
    else {
        res.status(468).send("No go.");
    }
};
exports.createArticleComment = createArticleComment;
/* Edits an article comment */
const editArticleComment = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(469).send("You shall not pass! ...sign in to edit your comment.");
    }
    let articleCommentId = parseInt(req.params.articleCommentId);
    // Check if the current user is the author of the article
    let articleComment = await articleComment_1.ArticleComment.findByPk(articleCommentId);
    if (articleComment.userId != user.userId) {
        return res.status(463).send("Thou shalt not edit thy neighbor's comment.");
    }
    const editedArticleComment = req.body;
    editedArticleComment.userId = user.userId;
    editedArticleComment.articleId = parseInt(req.params.articleId);
    let [updated] = await articleComment_1.ArticleComment.update(editedArticleComment, {
        where: { articleCommentId: articleCommentId }
    });
    if (updated === 1) {
        let articleComment = await articleComment_1.ArticleComment.findByPk(articleCommentId);
        res.status(200).json(articleComment);
    }
    else {
        res.status(470).send('Update failed');
    }
};
exports.editArticleComment = editArticleComment;
/* Deletes article comment */
const deleteArticleComment = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(471).send("You shall not pass! ...sign in to delete a article comment.");
    }
    let articleCommentId = parseInt(req.params.articleCommentId);
    // Check if the current user is the author of the article comment
    let articleComment = await articleComment_1.ArticleComment.findByPk(articleCommentId);
    if (articleComment.userId != user.userId) {
        return res.status(473).send("Trying to delete another's comment?");
    }
    let deleted = await articleComment_1.ArticleComment.destroy({
        where: { articleCommentId: articleCommentId }
    });
    if (deleted) {
        res.status(200).send('Deleted');
    }
    else {
        res.status(474).render('Deletion failed');
    }
};
exports.deleteArticleComment = deleteArticleComment;
