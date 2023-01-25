"use strict";
// import { RequestHandler } from 'express'
// import { User } from '../models/user'
// import { Article } from '../models/article'
// import { ArticleComment } from '../models/articleComment'
// import { verifyUser } from '../services/auth'
// export const getAllArticles: RequestHandler = async (req, res, next) => {
//     let articles = await Article.findAll({
//       include: { model: User}
//     })
//     res.status(200).json(articles)
//     // console.log(articles)
//   }
//   export const createArticle: RequestHandler = async (req, res, next) => {
//     let user: User | null = await verifyUser(req)
//     if (!user) {
//       return res.status(402).send('Sign in to share a blog post')
//     }
//     let newArticle: Article = req.body
//     newArticle.userId = user.userId
//     if (newArticle.content) {
//       let created = await Article.create(newArticle)
//       res.status(201).json(created)
//     } else {
//       res.status(403).send('Write something to post')
//     }
//   }
//   export const getArticle: RequestHandler = async (req, res, next) => {
//     let articleId = req.params.articleId
//     let article = await Article.findByPk(articleId)
//     if (article) {
//       res.status(200).json(article)
//     } else {
//       res.status(412).json('No articles here')
//     }
//   }
//   export const updateArticle: RequestHandler = async (req, res, next) => {
//     let user: User | null = await verifyUser(req)
//     if (!user) {
//       return res.status(403).send()
//     }
//     let articleId = req.params.articleId
//     let newArticle: Article = req.body
//     let articleFound = await Article.findByPk(articleId)
//     if (
//       articleFound &&
//       articleFound.articleId &&
//       articleFound.userId == newArticle.articleId &&
//       newArticle.content &&
//       user.userId
//     ) {
//       await Article.update(newArticle, {
//         where: { articleId: articleId } 
//       })
//       res.status(200).json('You are truly successful')
//     } else {
//       res.status(408).json('Bing Bang')
//     }
//   }
//   export const deleteArticle: RequestHandler = async (req, res, next) => {
//     let user: User | null = await verifyUser(req)
//     if (!user) {
//       return res.status(409).send()
//     }
//     let articleId = req.params.articleId
//     let found = await Article.findByPk(articleId)
//     let newFound = req.params.userId
//     if (found && found.articleId && found.userId) {
//       await Article.destroy({
//         where: { articleId: articleId }
//       })
//       res.status(200).json()
//     } else {
//       res.status(410).json('Sorry, try again')
//     }
//   }
