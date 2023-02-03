"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.getArticle = exports.createArticle = exports.getAllArticles = void 0;
const user_1 = require("../models/user");
const article_1 = require("../models/article");
const articleComment_1 = require("../models/articleComment");
const auth_1 = require("../services/auth");
const getAllArticles = async (req, res, next) => {
    let articles = await article_1.Article.findAll({
        include: { model: user_1.User }
    });
    res.status(200).json(articles);
    // console.log(articles)
};
exports.getAllArticles = getAllArticles;
const createArticle = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(402).send('Sign in to share a blog post');
    }
    let newArticle = req.body;
    newArticle.UserUserId = user.userId;
    if (newArticle.content) {
        let created = await article_1.Article.create(newArticle);
        res.status(201).json(created);
    }
    else {
        res.status(403).send('Write something to post');
    }
};
exports.createArticle = createArticle;
const getArticle = async (req, res, next) => {
    let articleId = req.params.articleId;
    let article = await article_1.Article.findByPk(articleId, {
        include: { model: articleComment_1.ArticleComment,
            required: false }
    });
    if (article) {
        res.status(200).json(article);
    }
    else {
        res.status(412).json('No articles here');
    }
};
exports.getArticle = getArticle;
const updateArticle = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let articleId = req.params.articleId;
    let newArticle = req.body;
    let articleFound = await article_1.Article.findByPk(articleId);
    if (articleFound &&
        articleFound.articleId &&
        articleFound.userId == newArticle.articleId &&
        newArticle.content &&
        user.userId) {
        await article_1.Article.update(newArticle, {
            where: { articleId: articleId }
        });
        res.status(200).json('You are truly successful');
    }
    else {
        res.status(408).json('Bing Bang');
    }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(409).send();
    }
    let articleId = req.params.articleId;
    let found = await article_1.Article.findByPk(articleId);
    let newFound = req.params.userId;
    if (found && found.articleId && found.userId) {
        await article_1.Article.destroy({
            where: { articleId: articleId }
        });
        res.status(200).json();
    }
    else {
        res.status(410).json('Sorry, try again');
    }
};
exports.deleteArticle = deleteArticle;
