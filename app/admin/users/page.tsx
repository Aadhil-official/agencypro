'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from 'cosmic-authentication';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

const UsersManagement = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorize = async () => {
      const res = await fetch('/api/admin/authorize');
      if (res.status === 403 || res.status === 401) {
        router.replace('/');
        return false;
      }
      return true;
    };

    const init = async () => {
      const ok = await authorize();
      if (!ok) return;
      setLoading(false);
    };

    init();
  }, [router]);

  const mockUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@agencypro.com',
      role: 'admin',
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'manager':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'user':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Icon icon="material-symbols:progress-activity" className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="text-lg text-gray-600">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <div className="rounded-full bg-blue-600 p-2">
                  <Icon icon="map:travel-agency" className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-medium text-gray-900">
                  <span>Agency</span><span className="text-blue-600">Pro</span>
                </span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium">
                <span>User Management</span>
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard" 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Icon icon="material-symbols:dashboard" className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  <span>{user?.displayName || user?.email}</span>
                </span>
                <button
                  onClick={signOut}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                  <Icon icon="material-symbols:logout" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              <span>User Management</span>
            </h1>
            <p className="text-gray-600">
              <span>Manage admin users and their permissions.</span>
            </p>
          </div>
        </motion.div>

        {/* Current User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Icon icon="material-symbols:person" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                <span>Currently Signed In</span>
              </h3>
              <p className="text-gray-600">
                <span>{user?.displayName || 'Admin User'} ({user?.email})</span>
              </p>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                <span>Admin</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Info Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start space-x-4">
            <Icon icon="material-symbols:info" className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                <span>User Management with Cosmic Auth</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <span>This application uses Cosmic Auth for authentication. Admin access is controlled by an env variable of approved admin emails. Ask your developer to add the admin email under ADMIN_EMAILS.</span>
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon icon="material-symbols:check-circle" className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Secure session management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="material-symbols:check-circle" className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Protected admin routes via middleware</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sample User Management Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              <span>Admin Users</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              <span>Users with administrative access to the system</span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>User</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Role</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Status</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Last Login</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Created</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockUsers.map((userData, index) => (
                  <motion.tr
                    key={userData.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <Icon icon="material-symbols:person" className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            <span>{userData.name}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            <span>{userData.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(userData.role)}`}>
                        <span>{userData.role}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(userData.status)}`}>
                        <span>{userData.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span>{formatDate(userData.lastLogin)}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span>{formatDate(userData.createdAt)}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Features Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <div className="text-center">
            <Icon icon="material-symbols:construction" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              <span>Advanced User Management Features</span>
            </h3>
            <p className="text-gray-500 mb-6">
              <span>Enhanced user management features are in development and will be available in future updates.</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Icon icon="material-symbols:group-add" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-medium text-gray-700">
                  <span>User Invitation System</span>
                </div>
                <div className="text-gray-500">
                  <span>Invite new admin users</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Icon icon="material-symbols:admin-panel-settings" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-medium text-gray-700">
                  <span>Role-Based Permissions</span>
                </div>
                <div className="text-gray-500">
                  <span>Fine-grained access control</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Icon icon="material-symbols:analytics" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-medium text-gray-700">
                  <span>Activity Tracking</span>
                </div>
                <div className="text-gray-500">
                  <span>Monitor user actions</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UsersManagement;