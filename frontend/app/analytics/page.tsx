'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { motion } from 'framer-motion';

interface OrderStats {
  totalSpent: number;
  totalSaved: number;
  totalOrders: number;
  byStatus: Record<string, number>;
}

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/user/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
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
        delayChildren: 0.2,
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
        className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Analytics</h1>
          <p className="text-gray-600">Your spending and savings overview</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        ) : stats ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Key Metrics */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Total Orders */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600"
              >
                <p className="text-gray-600 text-sm font-semibold">Total Orders</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {stats.totalOrders}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {Math.round(stats.totalOrders / 30)} orders per month
                </p>
              </motion.div>

              {/* Total Spent */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
              >
                <p className="text-sm font-semibold opacity-90">Total Spent</p>
                <p className="text-4xl font-bold mt-2">₹{stats.totalSpent}</p>
                <p className="text-xs opacity-75 mt-2">
                  ₹{Math.round(stats.totalSpent / stats.totalOrders)}/order avg
                </p>
              </motion.div>

              {/* Total Saved */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
              >
                <p className="text-sm font-semibold opacity-90">Total Saved</p>
                <p className="text-4xl font-bold mt-2">₹{stats.totalSaved}</p>
                <p className="text-xs opacity-75 mt-2">
                  {stats.totalSpent > 0
                    ? ((stats.totalSaved / stats.totalSpent) * 100).toFixed(1)
                    : 0}
                  % of spending
                </p>
              </motion.div>

              {/* Savings Rate */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
              >
                <p className="text-sm font-semibold opacity-90">Average Savings</p>
                <p className="text-4xl font-bold mt-2">
                  {stats.totalOrders > 0
                    ? (stats.totalSaved / stats.totalOrders).toFixed(0)
                    : 0}
                  ₹
                </p>
                <p className="text-xs opacity-75 mt-2">Per order saved</p>
              </motion.div>
            </motion.div>

            {/* Charts & Status Distribution */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Order Status Distribution */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Status Distribution
                </h2>
                <div className="space-y-4">
                  {Object.entries(stats.byStatus || {}).map(([status, count], index) => (
                    <motion.div
                      key={status}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-semibold capitalize">
                          {status}
                        </span>
                        <span className="text-gray-600 font-bold">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              stats.totalOrders > 0
                                ? (count / stats.totalOrders) * 100
                                : 0
                            }%`,
                          }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                          className={`h-full ${
                            status === 'delivered'
                              ? 'bg-green-500'
                              : status === 'pending'
                              ? 'bg-yellow-500'
                              : status === 'confirmed'
                              ? 'bg-blue-500'
                              : 'bg-red-500'
                          }`}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Spending Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  💰 Spending Summary
                </h2>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200"
                  >
                    <p className="text-gray-700 text-sm font-semibold mb-1">
                      Current Month Spending
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{stats.totalSpent}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200"
                  >
                    <p className="text-gray-700 text-sm font-semibold mb-1">
                      Current Month Savings
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{stats.totalSaved}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200"
                  >
                    <p className="text-gray-700 text-sm font-semibold mb-1">
                      Next Goal
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      Save ₹500 more
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Pro Tips */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border border-yellow-200"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">💡 Money-Saving Tips</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-1">🎯</span>
                  <span>
                    Compare prices before ordering. You could save up to ₹
                    {stats.totalOrders > 0
                      ? (stats.totalSaved / stats.totalOrders).toFixed(0)
                      : 0}{' '}
                    per order!
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-1">⭐</span>
                  <span>
                    Use promo codes during peak hours to maximize savings
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl mt-1">📱</span>
                  <span>
                    Check notifications for exclusive deals and limited-time offers
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </motion.div>
    </ProtectedRoute>
  );
}
