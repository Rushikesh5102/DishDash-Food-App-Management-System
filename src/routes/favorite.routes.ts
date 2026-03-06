import { Router } from 'express';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
  isFavorited,
} from '../controllers/favorite.controller';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Protected routes (require authentication)
router.post('/', authMiddleware, addFavorite);
router.get('/', authMiddleware, getFavorites);
router.delete('/:favoriteId', authMiddleware, removeFavorite);

// Optional auth (works with or without auth)
router.get('/check', optionalAuthMiddleware, isFavorited);

export default router;
