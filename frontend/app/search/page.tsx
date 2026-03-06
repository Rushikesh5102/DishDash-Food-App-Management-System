'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  rating?: number;
}

export default function SearchPage() {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const popularItems = [
    'Chicken Biryani',
    'Veg Burger',
    'Margherita Pizza',
    'Salmon Sushi Roll',
    'Paneer Butter Masala',
    'Masala Dosa',
    'Tandoori Chicken',
    'Garlic Naan',
  ];

  const handleSearch = async (searchTerm?: string) => {
    const finalQuery = searchTerm || query;
    if (!finalQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate search results
      const filtered = popularItems.filter(item =>
        item.toLowerCase().includes(finalQuery.toLowerCase())
      );

      // Mock results
      const mockResults: Product[] = filtered.map((item, idx) => ({
        id: idx,
        name: item,
        description: `Delicious ${item} available on multiple platforms`,
        price: Math.floor(Math.random() * 400) + 150,
        rating: Math.random() * 2 + 3,
      }));

      setResults(mockResults);

      if (mockResults.length === 0) {
        setError('No results found. Try a different search term.');
      }
    } catch (err: any) {
      setError('Error fetching results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-6">Sign in to search for food and compare prices</p>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold"
            >
              Go to Login
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50 p-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent mb-2">
              🔍 Search Food
            </h1>
            <p className="text-gray-600 text-lg">
              Find and compare food prices across platforms
            </p>
          </div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for any dish..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-6 py-4 rounded-xl border-2 border-amber-200 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none text-gray-900 placeholder-gray-500"
              />
              <motion.button
                onClick={() => handleSearch()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? '🔄' : 'Search'}
              </motion.button>
            </div>
          </motion.div>

          {/* Popular Items */}
          {results.length === 0 && !loading && query === '' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Items</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularItems.map((item, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setQuery(item);
                      handleSearch(item);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-white border-2 border-amber-100 rounded-xl hover:border-amber-600 transition-all text-center"
                  >
                    <p className="font-semibold text-gray-900 text-sm">{item}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="animate-spin inline-block w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mx-auto"></div>
              <p className="text-center text-gray-600 mt-4">Searching...</p>
            </motion.div>
          )}

          {/* Results Grid */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {results.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 border-2 border-amber-100 hover:border-amber-600 transition-all shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg flex-1">
                      {product.name}
                    </h3>
                    {product.rating && (
                      <span className="text-yellow-500 font-semibold ml-2">
                        ⭐ {product.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-2xl font-bold text-amber-600">
                      ₹{product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-amber-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                      View Options
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results State */}
          {results.length === 0 && !loading && query !== '' && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 py-12"
            >
              <p className="text-xl mb-4">🔍 No results found</p>
              <p className="mb-6">Try searching for a different dish</p>
              <motion.button
                onClick={() => {
                  setQuery('');
                  setResults([]);
                }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-pink-600 text-white rounded-lg font-semibold"
              >
                Clear Search
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
