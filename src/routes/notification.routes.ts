import { Router } from 'express';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification,
  getUnreadCount,
} from '../controllers/notification.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Get notifications
router.get('/', getNotifications);

// Get unread count
router.get('/unread/count', getUnreadCount);

// Create notification (internal use)
router.post('/', createNotification);

// Mark as read
router.put('/:notificationId/read', markAsRead);

// Mark all as read
router.put('/read/all', markAllAsRead);
router.put('/read-all', markAllAsRead);

// Delete notification
router.delete('/:notificationId', deleteNotification);

export default router;
