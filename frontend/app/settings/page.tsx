'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    currency: 'INR',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        pincode: user.pincode || '',
      });
    }

    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(updated));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">⚙️ Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              👤 Profile Information
            </h2>

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
              >
                ✓ {success}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
              >
                ✕ {error}
              </motion.div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Names Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* City & Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Pune"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="411001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 mt-6"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </form>
          </motion.div>

          {/* Preferences Sidebar */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-8 h-fit"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Preferences</h2>

            <div className="space-y-4 mb-8">
              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-600">Push notifications</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() =>
                    handlePreferenceChange('notifications', !preferences.notifications)
                  }
                  className={`w-12 h-6 rounded-full transition ${
                    preferences.notifications
                      ? 'bg-amber-600'
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition transform ${
                      preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  ></div>
                </motion.button>
              </div>

              {/* Email Updates */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Email Updates</p>
                  <p className="text-xs text-gray-600">Promotional emails</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() =>
                    handlePreferenceChange('emailUpdates', !preferences.emailUpdates)
                  }
                  className={`w-12 h-6 rounded-full transition ${
                    preferences.emailUpdates
                      ? 'bg-amber-600'
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition transform ${
                      preferences.emailUpdates ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  ></div>
                </motion.button>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Currency
                </label>
                <select
                  value={preferences.currency}
                  onChange={(e) =>
                    handlePreferenceChange('currency', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="INR">₹ INR (India)</option>
                  <option value="USD">$ USD (USA)</option>
                  <option value="EUR">€ EUR (Europe)</option>
                </select>
              </div>
            </div>

            {/* Account Actions */}
            <div className="border-t border-gray-200 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full bg-red-50 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-100 transition"
              >
                🚪 Logout
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </ProtectedRoute>
  );
}
