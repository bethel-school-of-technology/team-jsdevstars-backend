import { Router } from 'express';
import { createArticle, deleteArticle, getAllArticles, getArticle, updateArticle } from '../controllers/articleController';

const router = Router();

router.get('/', getAllArticles);

router.post('/', createArticle);

router.get('/:tweetId', getArticle);

router.put('/:tweetId', updateArticle);

router.delete('/:tweetId', deleteArticle);

export default router;