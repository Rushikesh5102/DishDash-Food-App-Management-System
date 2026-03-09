'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { API_BASE_URL } from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Order {
  id: number;
  productId: number;
  platformId: number;
  restaurantId: number;
  price: number;
  deliveryFee: number;
  totalPrice: number;
  discount: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [filter, page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const limit = 10;
      const offset = (page - 1) * limit;
      const query =
        filter !== 'all'
          ? `?status=${filter}&limit=${limit}&offset=${offset}`
          : `?limit=${limit}&offset=${offset}`;

      const response = await fetch(
        `${API_BASE_URL}/api/orders/user/history${query}`,
        {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || data.data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statusColorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-amber-100 text-amber-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <ProtectedRoute>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50 to-pink-50 p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track all your food orders</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {['all', 'pending', 'confirmed', 'delivered', 'cancelled'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFilter(status);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                filter === status
                  ? 'bg-gradient-to-r from-amber-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-amber-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          ) : orders.length > 0 ? (
            orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-3xl">🍽️</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{order.totalPrice}
                      </p>
                      {order.discount > 0 && (
                        <p className="text-sm text-green-600 font-semibold">
                          Saved ₹{order.discount}
                        </p>
                      )}
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs font-semibold px-4 py-2 rounded-full ${
                        statusColorMap[order.status] ||
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </motion.span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">
                      ITEM PRICE
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      ₹{order.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">
                      DELIVERY FEE
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      ₹{order.deliveryFee}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">
                      DISCOUNT
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      -₹{order.discount}
                    </p>
                  </div>
                  <div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 transition w-full"
                    >
                      Rate Order
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md p-12 text-center"
            >
              <p className="text-3xl mb-4">🛒</p>
              <p className="text-gray-600 text-lg mb-6">No orders found</p>
              <Link
                href="/search"
                className="inline-block bg-gradient-to-r from-amber-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Order Now
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </ProtectedRoute>
  );
}
