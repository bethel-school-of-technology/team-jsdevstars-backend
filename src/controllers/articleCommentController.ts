import { RequestHandler } from 'express'
import { User } from '../models/user'
import { Article } from '../models/article'
import { ArticleComment } from '../models/articleComment'
import { verifyUser } from '../services/auth'


export const getAllArticleComments: RequestHandler = async (req, res, next) => {
    let articleComments = await ArticleComment.findAll({
      include: { model: User}
    })
    res.status(200).json(articleComments)
    // console.log(articles)
  }
  
  export const createArticleComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
  
    if (!user) {
      return res.status(402).send('Sign in to post a comment')
    }
  
    let newArticleComment: ArticleComment = req.body
    newArticleComment.userId = user.userId
  
    if (newArticleComment.comment) {
      let created = await ArticleComment.create(newArticleComment)
      res.status(201).json(created)
    } else {
      res.status(403).send('Write something to post')
    }
  }
  
  
  export const getArticleComment: RequestHandler = async (req, res, next) => {
    let articleId = req.params.ArticleArticleId
    let articleComment = await ArticleComment.findByPk(articleId)
    if (articleComment) {
      res.status(200).json(articleComment)
    } else {
      res.status(412).json('No articles here')
    }
  }
  
 
  
  export const updateArticleComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
  
    if (!user) {
      return res.status(403).send()
    }
  
    let articleId = req.params.ArticleArticleId
    let newArticleComment: ArticleComment = req.body
  
    let articleFound = await ArticleComment.findByPk(articleId)
  
    if (
      articleCommentFound &&
      articleCommentFound.id &&
      articleCommentFound.userId == newArticleComment.id &&
      newArticleComment.comment &&
      user.userId
    ) {
      await ArticleComment.update(newArticleComment, {
        where: { id: id } 
      })
      res.status(200).json('You are truly successful')
    } else {
      res.status(408).json('Bing Bang')
    }
  }
  
  export const deleteArticleComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
  
    if (!user) {
      return res.status(409).send()
    }
  
    let CommentId = req.params.articleId
    let found = await ArticleComment.findByPk(id)
    let newFound = req.params.userId
  
    if (found && found.id && found.userId) {
      await ArticleComment.destroy({
        where: { id: id }
      })
      res.status(200).json()
    } else {
      res.status(410).json('Sorry, try again')
    }
  }
  