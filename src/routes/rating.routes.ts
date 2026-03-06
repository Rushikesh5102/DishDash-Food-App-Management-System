import { Router } from 'express';
import {
  createRating,
  getRatings,
  getUserRatings,
  markHelpful,
  deleteRating,
} from '../controllers/rating.controller';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Create rating (authenticated)
router.post('/', authMiddleware, createRating);

// Get user's ratings (authenticated)
router.get('/user/my-ratings', authMiddleware, getUserRatings);

// Get ratings for a specific entity (can be accessed without auth)
router.get('/', optionalAuthMiddleware, getRatings);

// Mark rating as helpful
router.post('/:ratingId/helpful', markHelpful);

// Delete rating (authenticated)
router.delete('/:ratingId', authMiddleware, deleteRating);

export default router;
