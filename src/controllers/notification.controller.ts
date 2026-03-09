import { Request, Response } from 'express';
import Notification from '../models/notification.model';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { unreadOnly = false, limit = 20, offset = 0 } = req.query;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const filter: Record<string, unknown> = { userId };
    if (unreadOnly === 'true') filter.isRead = false;

    const parsedLimit = parseInt(String(limit), 10);
    const parsedOffset = parseInt(String(offset), 10);

    const [notifications, count, unreadCount] = await Promise.all([
      Notification.findAll({
        where: filter,
        order: [['createdAt', 'DESC']],
        offset: parsedOffset,
        limit: parsedLimit,
      }),
      Notification.count({ where: filter }),
      Notification.count({ where: { userId, isRead: false } }),
    ]);

    return res.status(200).json({ success: true, count, unreadCount, notifications });
  } catch (error: any) {
    console.error('Get notifications error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching notifications', error: error.message });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { notificationId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const notification = await Notification.findOne({ where: { id: Number(notificationId), userId } });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    return res.status(200).json({ success: true, message: 'Notification marked as read', notification });
  } catch (error: any) {
    console.error('Mark as read error:', error);
    return res.status(500).json({ success: false, message: 'Error marking read', error: error.message });
  }
};

export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    await Notification.update({ isRead: true, readAt: new Date() }, { where: { userId, isRead: false } });

    return res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error: any) {
    console.error('Mark all as read error:', error);
    return res.status(500).json({ success: false, message: 'Error marking all as read', error: error.message });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { notificationId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const result = await Notification.destroy({ where: { id: Number(notificationId), userId } });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    return res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (error: any) {
    console.error('Delete notification error:', error);
    return res.status(500).json({ success: false, message: 'Error deleting notification', error: error.message });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, orderId, title, message, notificationType, actionUrl, icon } = req.body;

    if (!userId || !title || !message) {
      return res.status(400).json({ success: false, message: 'userId, title, and message are required' });
    }

    const notification = await Notification.create({
      userId,
      orderId,
      title,
      message,
      notificationType: notificationType || 'general',
      actionUrl,
      icon,
      isRead: false,
    });

    return res.status(201).json({ success: true, message: 'Notification created', notification });
  } catch (error: any) {
    console.error('Create notification error:', error);
    return res.status(500).json({ success: false, message: 'Error creating notification', error: error.message });
  }
};

export const getUnreadCount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const unreadCount = await Notification.count({ where: { userId, isRead: false } });

    return res.status(200).json({ success: true, unreadCount });
  } catch (error: any) {
    console.error('Get unread count error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching unread count', error: error.message });
  }
};
