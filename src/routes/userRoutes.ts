import { Router } from 'express';
// import { getPublicUserTweets, getloggedinTweets } from '../controllers/tweetController';
import { createUser, getUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);

// router.post('/login', loginUser);

// router.get('/:userId', getUser);

// correct path in postman
// router.get('/:userId', getUserComments);

// not working in postman
// router.get('/getLoggedinTweets', getloggedinTweets)

// router.get('/logged/:userId', getloggedinTweets)

export default router;