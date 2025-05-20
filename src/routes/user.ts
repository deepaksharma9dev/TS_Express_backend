import express from 'express';
import * as userController from '../controllers/user';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

// Create user (no auth required)
router.post('/users', userController.createUser);

// Get user (requires auth)
router.get('/users/:id', authenticateToken, userController.getUser);

// Update user (requires auth)
router.put('/users/:id', authenticateToken, userController.updateUser);

// Delete user (requires auth)
router.delete('/users/:id', authenticateToken, userController.deleteUser);

// Login route
router.post('/users/login', userController.loginUser);

export default router;