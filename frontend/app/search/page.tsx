'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  restaurant: string;
  description: string;
  price: number;
  image?: string;
  rating?: number;
}

interface PlatformPrice {
  platform: string;
  price: number;
  deliveryFee: number;
  discount: number;
  eta: number;
}

export default function SearchPage() {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [platformPrices, setPlatformPrices] = useState<PlatformPrice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'fastest' | 'default'>('default');

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

  const platforms = [
    { name: 'Swiggy', color: 'from-orange-400 to-orange-500', url: 'https://www.swiggy.com' },
    { name: 'Zomato', color: 'from-red-400 to-red-500', url: 'https://www.zomato.com' },
    { name: 'Eatsure', color: 'from-yellow-400 to-yellow-500', url: 'https://www.eatsure.com' },
    { name: 'Maginpin', color: 'from-green-400 to-green-500', url: 'https://www.maginpin.com' },
  ];

  const restaurants = [
    'Paradise Biryani',
    'Burger King',
    'Dominos Pizza',
    'Sushi Station',
    'Spice Kitchen',
    'The Dosa House',
    'BBQ Delight',
    'Bread Basket',
  ];

  const handleViewOptions = (product: Product) => {
    setSelectedProduct(product);
    const mockPlatformPrices = platforms.map((p) => ({
      platform: p.name,
      price: product.price + Math.floor(Math.random() * 100) - 30,
      deliveryFee: Math.floor(Math.random() * 50) + 20,
      discount: Math.floor(Math.random() * 200),
      eta: Math.floor(Math.random() * 30) + 15,
    }));
    
    let sorted = [...mockPlatformPrices];
    if (sortBy === 'fastest') {
      sorted.sort((a, b) => a.eta - b.eta);
    } else if (sortBy === 'price') {
      sorted.sort((a, b) => a.price + a.deliveryFee - b.price - b.deliveryFee);
    } else {
      sorted.sort((a, b) => a.price + a.deliveryFee - b.price - b.deliveryFee);
    }
    
    setPlatformPrices(sorted);
    setIsModalOpen(true);
  };

  const handleOrderPlatform = (platformName: string) => {
    const platform = platforms.find(p => p.name === platformName);
    if (platform) {
      window.open(platform.url, '_blank');
    }
  };

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
        restaurant: restaurants[idx % restaurants.length],
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

          {/* Filter Options */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-semibold">Sort by:</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy('default')}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    sortBy === 'default'
                      ? 'bg-gradient-to-r from-amber-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Default
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy('fastest')}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    sortBy === 'fastest'
                      ? 'bg-gradient-to-r from-amber-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ⚡ Fastest Delivery
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy('price')}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    sortBy === 'price'
                      ? 'bg-gradient-to-r from-amber-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  💰 Lowest Price
                </motion.button>
              </div>
            </motion.div>
          )}

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
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-amber-600">🏪 {product.restaurant}</p>
                  </div>
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
                      onClick={() => handleViewOptions(product)}
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

          {/* Platform Price Comparison Modal */}
          <AnimatePresence>
            {isModalOpen && selectedProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                >
                  {/* Modal Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-amber-600 mb-2">🏪 {selectedProduct.restaurant}</p>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4"
                    >
                      ✕
                    </motion.button>
                  </div>

                  <div className="border-b border-gray-200 mb-6"></div>

                  {/* Platform Prices Grid */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Available on {platforms.length} Platforms
                    </h3>

                    {platformPrices.map((item, idx) => {
                      const bestDeal = idx === 0;
                      const totalCost = item.price + item.deliveryFee - item.discount;

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            bestDeal
                              ? 'border-amber-600 bg-amber-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                                  platforms.find((p) => p.name === item.platform)
                                    ?.color
                                }`}
                              ></div>
                              <h4 className="text-lg font-bold text-gray-900">
                                {item.platform}
                              </h4>
                            </div>
                            {bestDeal && (
                              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-sm font-bold rounded-full">
                                Best Deal! 🎉
                              </span>
                            )}
                          </div>

                          {/* Price Breakdown */}
                          <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between text-gray-700">
                              <span>Item Price:</span>
                              <span className="font-semibold">₹{item.price}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                              <span>Delivery Fee:</span>
                              <span className="font-semibold">₹{item.deliveryFee}</span>
                            </div>
                            {item.discount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Discount:</span>
                                <span className="font-semibold">-₹{item.discount}</span>
                              </div>
                            )}
                            <div className="border-t border-gray-300 pt-2 flex justify-between text-gray-900 font-bold">
                              <span>Total Cost:</span>
                              <span className="text-lg">₹{totalCost}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 text-xs">
                              <span>Delivery Time:</span>
                              <span>{item.eta} mins</span>
                            </div>
                          </div>

                          {/* Order Button */}
                          <motion.button
                            onClick={() => handleOrderPlatform(item.platform)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 bg-gradient-to-r from-amber-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
                          >
                            Order from {item.platform} → ₹{totalCost}
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
