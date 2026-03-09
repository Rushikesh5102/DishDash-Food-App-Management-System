'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { API_BASE_URL } from '@/lib/api';
import { getErrorMessage, readResponseBody } from '@/lib/http';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface OrderStats {
  totalSpent: number;
  totalSaved: number;
  totalOrders: number;
  byStatus: Record<string, number>;
}

interface RecentOrder {
  id: number;
  productId: number;
  restaurantId: number;
  price: number;
  deliveryFee: number;
  totalPrice: number;
  discount: number;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('authToken');

      // Fetch order stats
      const statsResponse = await fetch(
        `${API_BASE_URL}/api/orders/user/stats`,
        {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const statsBody = await readResponseBody(statsResponse);
      if (!statsResponse.ok) {
        throw new Error(getErrorMessage(statsBody, statsResponse.status));
      }
      setStats(statsBody?.stats || statsBody?.data || null);

      // Fetch recent orders
      const ordersResponse = await fetch(
        `${API_BASE_URL}/api/orders/user/history?limit=5`,
        {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const ordersBody = await readResponseBody(ordersResponse);
      if (!ordersResponse.ok) {
        throw new Error(getErrorMessage(ordersBody, ordersResponse.status));
      }
      setRecentOrders(ordersBody?.orders || ordersBody?.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <ProtectedRoute>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-pink-50 p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent">{user?.firstName}!</span>
          </h1>
          <p className="text-gray-600 text-lg">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <motion.div variants={itemVariants}>
            <Link href="/search">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-left border-l-4 border-amber-600"
              >
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="text-lg font-bold text-gray-900">Search Foods</h3>
                <p className="text-sm text-gray-600">Find your favorite dishes</p>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/favorites">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-left border-l-4 border-pink-500"
              >
                <div className="text-3xl mb-2">❤️</div>
                <h3 className="text-lg font-bold text-gray-900">My Favorites</h3>
                <p className="text-sm text-gray-600">View saved items</p>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/notifications">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-left border-l-4 border-amber-500"
              >
                <div className="text-3xl mb-2">🔔</div>
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">Latest updates</p>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Total Spent */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="text-sm font-semibold opacity-90">Total Spent</div>
            <div className="text-3xl font-bold mt-2">
              ₹{stats?.totalSpent || '0'}
            </div>
            <p className="text-sm opacity-75 mt-2">
              {stats?.totalOrders || 0} orders placed
            </p>
          </motion.div>

          {/* Total Saved */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="text-sm font-semibold opacity-90">Total Saved</div>
            <div className="text-3xl font-bold mt-2">
              ₹{stats?.totalSaved || '0'}
            </div>
            <p className="text-sm opacity-75 mt-2">With our discounts</p>
          </motion.div>

          {/* Average Order */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-amber-600 to-pink-600 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="text-sm font-semibold opacity-90">Average Order</div>
            <div className="text-3xl font-bold mt-2">
              ₹{stats?.totalOrders && stats.totalSpent ? Math.round(stats.totalSpent / stats.totalOrders) : '0'}
            </div>
            <p className="text-sm opacity-75 mt-2">Per transaction</p>
          </motion.div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Recent Orders</h2>
            <Link href="/orders" className="text-amber-600 font-semibold hover:text-amber-700 transition">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-gray-900">₹{order.totalPrice}</p>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1 ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No orders yet</p>
              <Link href="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-amber-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Order Now
                </motion.button>
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </ProtectedRoute>
  );
}
