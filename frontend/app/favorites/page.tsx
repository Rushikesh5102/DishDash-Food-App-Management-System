'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { API_BASE_URL } from '@/lib/api';
import { getErrorMessage, readResponseBody } from '@/lib/http';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Favorite {
  id: number;
  userId: number;
  productId: number;
  platformId: number;
  savedPrice: number;
  savedDeliveryFee: number;
  createdAt: string;
}

export default function FavoritesPage() {
  useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      const response = await fetch(`${API_BASE_URL}/api/favorites`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await readResponseBody(response);
      if (!response.ok) {
        throw new Error(getErrorMessage(body, response.status));
      }
      setFavorites(body?.favorites || body?.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId: number) => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`${API_BASE_URL}/api/favorites/${favoriteId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await readResponseBody(response);
      if (!response.ok) {
        throw new Error(getErrorMessage(body, response.status));
      }
      setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
    } catch (err: any) {
      setError(err.message || 'Error removing favorite');
    }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">❤️ My Favorites</h1>
          <p className="text-gray-600">
            {favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}
          </p>
        </motion.div>

        {/* Favorites Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-200 overflow-hidden"
                >
                  {/* Placeholder Image */}
                  <div className="h-48 bg-gradient-to-br from-amber-200 to-pink-200 flex items-center justify-center relative">
                    <div className="text-5xl">🍕</div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFavorite(favorite.id)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-red-50"
                    >
                      ❤️
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Product #{favorite.productId}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Saved Price</span>
                        <span className="font-bold text-gray-900">
                          ₹{favorite.savedPrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Delivery Fee</span>
                        <span className="font-bold text-gray-900">
                          ₹{favorite.savedDeliveryFee}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="text-sm font-semibold text-gray-700">Total Saved</span>
                        <span className="font-bold text-green-600">
                          ₹{favorite.savedPrice + favorite.savedDeliveryFee}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mb-4">
                      Saved on {new Date(favorite.createdAt).toLocaleDateString()}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-amber-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      Compare Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-md p-12 text-center"
            >
              <p className="text-3xl mb-4">🥳</p>
              <p className="text-gray-600 text-lg mb-2">No favorites yet</p>
              <p className="text-gray-500 mb-6">Start adding your favorite dishes to quickly compare prices</p>
              <Link
                href="/search"
                className="inline-block bg-gradient-to-r from-amber-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Explore Foods
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </ProtectedRoute>
  );
}
