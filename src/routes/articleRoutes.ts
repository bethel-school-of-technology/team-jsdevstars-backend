import { Router } from 'express';
import { createArticle, createArticleComment, deleteArticle, deleteArticleComment, editArticle, editArticleComment, getAllArticles, getArticleById, getArticleCommentById } from '../controllers/articleController';

const router = Router();

router.get('/', getAllArticles);

router.post('/', createArticle);

router.get('/:articleId', getArticleById);

router.put('/:articleId', editArticle);

router.delete('/:articleId', deleteArticle);

// Comments

// router.get('/', getAllArticleComment);

router.post('/:articleId', createArticleComment);

router.get('/:articleId/:articleCommentId', getArticleCommentById);

router.put('/:articleId/:articleCommentId', editArticleComment);

router.delete('/:articleId/:articleCommentId', deleteArticleComment);

export default router;