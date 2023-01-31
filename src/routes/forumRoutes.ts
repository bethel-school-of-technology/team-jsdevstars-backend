import { Router } from 'express';
import { createForum, deleteForum, getAllForums, getForumById, editForum, createForumComment, getForumCommentById, editForumComment, deleteForumComment } from '../controllers/forumController';

const router = Router();

router.get('/', getAllForums);

router.post('/', createForum);

router.get('/:forumId', getForumById);

router.post('/:forumId', createForumComment);

router.put('/:forumId', editForum);

router.delete('/:forumId', deleteForum);

router.get('/:forumId/:forumCommentId', getForumCommentById);

router.put('/:forumId/:forumCommentId', editForumComment);

router.delete('/:forumId/:forumCommentId', deleteForumComment);

export default router;