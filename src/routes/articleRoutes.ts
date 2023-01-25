import { Router } from 'express';
import { createArticle, deleteArticle, getAllArticles, getArticle, updateArticle } from '../controllers/articleController';

const router = Router();

router.get('/', getAllArticles);

router.post('/', createArticle);

router.get('/:articleId', getArticle);

router.put('/:articleId', updateArticle);

router.delete('/:articleId', deleteArticle);

export default router;