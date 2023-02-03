import { Router } from 'express';
import { createArticleComment, deleteArticleComment, getAllArticleComments, getArticleComment, updateArticleComment } from '../controllers/articleCommentController';
import {  } from '../controllers/articleController';

const router = Router();

router.get('/', getAllArticleComments);

router.post('/', createArticleComment);

router.get('/:articleId', getArticleComment);

router.put('/:articleId', updateArticleComment);

router.delete('/:articleId', deleteArticleComment);

export default router;