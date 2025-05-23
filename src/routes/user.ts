import express from 'express';
import * as userController from '../controllers/user';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/users', userController.createUser);
router.post('/users/login', userController.loginUser);

// Protected routes
router.get('/users/:id', authMiddleware, userController.getUser);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

export default router;