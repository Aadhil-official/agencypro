'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

const AdminSignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [alreadyExists, setAlreadyExists] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);
    setAlreadyExists(false);

    try {
      const response = await fetch('/api/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          setAlreadyExists(true);
        } else {
          setSuccess(true);
          setFormData({ name: '', email: '', phone: '', note: '' });
        }
      } else {
        setError(data.error || 'Failed to create admin account');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="rounded-full bg-blue-600 p-2">
                <Icon icon="map:travel-agency" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-medium text-gray-900">
                <span>Agency</span><span className="text-blue-600">Pro</span>
              </span>
            </Link>

            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Icon icon="material-symbols:arrow-back" className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <Icon icon="material-symbols:admin-panel-settings" className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-3">
            <span>Admin Account Request</span>
          </h1>
          <p className="text-lg text-gray-600">
            <span>Request administrative access to AgencyPro</span>
          </p>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start space-x-4">
              <Icon icon="material-symbols:check-circle" className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-green-900 mb-2">
                  <span>Account Created Successfully!</span>
                </h3>
                <p className="text-green-700 mb-4">
                  <span>Your admin account has been created. You can now sign in to access the admin dashboard.</span>
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-green-800 font-medium">
                    <span>Next Steps:</span>
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-green-700">
                    <li>Click the button below to go to the admin dashboard</li>
                    <li>Sign in using your email address</li>
                    <li>Complete the authentication process</li>
                    <li>You&apos;ll be redirected to your admin panel</li>
                  </ol>
                  <button
                    onClick={() => router.push('/admin/dashboard')}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center"
                  >
                    <Icon icon="material-symbols:dashboard" className="w-5 h-5 mr-2" />
                    <span>Go to Admin Dashboard</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Already Exists Message */}
        {alreadyExists && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start space-x-4">
              <Icon icon="material-symbols:info" className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-yellow-900 mb-2">
                  <span>Account Already Exists</span>
                </h3>
                <p className="text-yellow-700 mb-3">
                  <span>An admin account with this email already exists. You can proceed to sign in.</span>
                </p>
                <button
                  onClick={() => router.push('/admin/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center"
                >
                  <Icon icon="material-symbols:login" className="w-5 h-5 mr-2" />
                  <span>Sign In to Admin Dashboard</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start space-x-4">
              <Icon icon="material-symbols:error" className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-red-900 mb-1">
                  <span>Error</span>
                </h3>
                <p className="text-red-700">
                  <span>{error}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="admin@example.com"
              />
              <p className="mt-2 text-xs text-gray-500">
                <span>You&apos;ll use this email to sign in to the admin panel</span>
              </p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <span>Phone Number</span>
                <span className="text-gray-400 ml-1">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                <span>Reason for Admin Access</span>
                <span className="text-gray-400 ml-1">(Optional)</span>
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                placeholder="Briefly describe why you need admin access..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="material-symbols:progress-activity" className="w-5 h-5 mr-2 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <Icon icon="material-symbols:person-add" className="w-5 h-5 mr-2" />
                    <span>Create Admin Account</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-4">
            <Icon icon="material-symbols:info" className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">
                <span>About Admin Access</span>
              </p>
              <ul className="space-y-1 text-blue-700">
                <li>• Admin accounts have full access to manage the platform</li>
                <li>• You&apos;ll be able to manage service requests, advertisements, and users</li>
                <li>• After account creation, sign in using Cosmic Authentication</li>
                <li>• Your account will be created with &quot;active&quot; status</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSignupPage;
