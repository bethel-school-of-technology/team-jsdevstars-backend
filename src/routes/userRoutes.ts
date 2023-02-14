import { Router } from 'express';
import { createUser, deleteUser, getUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);

router.post('/login', loginUser);

router.get('/:userId', getUser);

// router.put('/:userId', editUser);

router.delete('/:userId', deleteUser);

export default router;