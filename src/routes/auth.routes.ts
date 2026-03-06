import { Router } from 'express';
import {
  signup,
  login,
  logout,
  getCurrentUser,
  updateProfile,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware, updateProfile);

export default router;
