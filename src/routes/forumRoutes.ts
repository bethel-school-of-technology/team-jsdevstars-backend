import { Router } from 'express';
import { createForum, deleteForum, getAllForums, getForumById, editForum } from '../controllers/forumController';

const router = Router();

router.get('/', getAllForums);

router.post('/', createForum);

router.get('/:forumId', getForumById);

router.put('/:forumId', editForum);

router.delete('/:ForumId', deleteForum);

export default router;