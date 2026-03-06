'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { motion } from 'framer-motion';

interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system' | 'delivery';
  isRead: boolean;
  actionUrl?: string;
  icon?: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, [filterType]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const query = filterType !== 'all' ? `?type=${filterType}` : '';

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/notifications${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const token = localStorage.getItem('authToken');

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/notifications/${notificationId}/read`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(
        notifications.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err: any) {
      console.error('Error marking as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('authToken');

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/notifications/read-all`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })));
    } catch (err: any) {
      console.error('Error marking all as read:', err);
    }
  };

  const deleteNotification = async (notificationId: number) => {
    try {
      const token = localStorage.getItem('authToken');

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/notifications/${notificationId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(notifications.filter((notif) => notif.id !== notificationId));
    } catch (err: any) {
      console.error('Error deleting notification:', err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const typeIconMap: Record<string, string> = {
    order: '📦',
    promo: '🎉',
    system: '⚙️',
    delivery: '🚚',
  };

  const typeColorMap: Record<string, string> = {
    order: 'bg-blue-50 border-blue-200',
    promo: 'bg-purple-50 border-purple-200',
    system: 'bg-gray-50 border-gray-200',
    delivery: 'bg-green-50 border-green-200',
  };

  return (
    <ProtectedRoute>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header with Unread Count */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🔔 Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0
                ? `${unreadCount} unread ${unreadCount === 1 ? 'notification' : 'notifications'}`
                : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllAsRead}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Mark All Read
            </motion.button>
          )}
        </motion.div>

        {/* Type Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {['all', 'order', 'promo', 'delivery', 'system'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filterType === type
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-600'
              }`}
            >
              {type === 'all' ? 'All' : typeIconMap[type as keyof typeof typeIconMap]} {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
                className={`p-4 rounded-xl border-2 transition cursor-pointer ${
                  typeColorMap[notification.type] || 'bg-gray-50 border-gray-200'
                } ${!notification.isRead ? 'font-semibold' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {typeIconMap[notification.type] || '📬'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.isRead && (
                      <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-red-600 transition text-lg"
                    >
                      ✕
                    </motion.button>
                  </div>
                </div>

                {notification.actionUrl && (
                  <div className="mt-3 ml-12">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      href={notification.actionUrl}
                      className="inline-block text-indigo-600 font-semibold hover:text-indigo-700"
                    >
                      View Details →
                    </motion.a>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md p-12 text-center"
            >
              <p className="text-3xl mb-4">📭</p>
              <p className="text-gray-600 text-lg">No notifications</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </ProtectedRoute>
  );
}
