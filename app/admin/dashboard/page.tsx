'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from 'cosmic-authentication';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    activeAds: 0,
    totalAds: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);
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

    const fetchData = async () => {
      const ok = await authorize();
      if (!ok) return;
      try {
        // Fetch service requests
        const requestsResponse = await fetch('/api/service-requests');
        const requestsData = await requestsResponse.json();
        const requests = requestsData.serviceRequests || [];

        // Fetch advertisements
        const adsResponse = await fetch('/api/advertisements');
        const adsData = await adsResponse.json();
        const ads = adsData.advertisements || [];

        // Calculate stats
        const pendingRequests = requests.filter((req: { status: string }) => req.status === 'pending').length;
        const activeAds = ads.filter((ad: { isActive: boolean }) => ad.isActive).length;

        setStats({
          totalRequests: requests.length,
          pendingRequests,
          activeAds,
          totalAds: ads.length
        });

        // Get recent requests (last 5)
        setRecentRequests(requests.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const dashboardCards = [
    {
      title: 'Total Requests',
      value: stats.totalRequests,
      icon: 'material-symbols:request-quote',
      color: 'blue',
      href: '/admin/requests'
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: 'material-symbols:pending',
      color: 'yellow',
      href: '/admin/requests?status=pending'
    },
    {
      title: 'Active Ads',
      value: stats.activeAds,
      icon: 'material-symbols:campaign',
      color: 'green',
      href: '/admin/ads'
    },
    {
      title: 'Total Ads',
      value: stats.totalAds,
      icon: 'material-symbols:ads-click',
      color: 'purple',
      href: '/admin/ads'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Service Requests',
      description: 'View and manage customer service requests',
      icon: 'material-symbols:request-quote',
      href: '/admin/requests',
      color: 'blue'
    },
    {
      title: 'Manage Advertisements',
      description: 'Create and manage advertisement banners',
      icon: 'material-symbols:campaign',
      href: '/admin/ads',
      color: 'green'
    },
    {
      title: 'User Management',
      description: 'Manage admin users and permissions',
      icon: 'material-symbols:people',
      href: '/admin/users',
      color: 'purple'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Icon icon="material-symbols:progress-activity" className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="text-lg text-gray-600">Loading dashboard...</span>
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
              <Link href="/" className="flex items-center space-x-2">
                <div className="rounded-full bg-blue-600 p-2">
                  <Icon icon="map:travel-agency" className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-medium text-gray-900">
                  <span>Agency</span><span className="text-blue-600">Pro</span>
                </span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium">
                <span>Admin Dashboard</span>
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Icon icon="material-symbols:public" className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  <span>Welcome, {user?.displayName || user?.email}</span>
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            <span>Dashboard Overview</span>
          </h1>
          <p className="text-gray-600">
            <span>Manage your agency&apos;s operations and monitor performance.</span>
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={card.href}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span>{card.title}</span>
                      </p>
                      <p className="text-2xl font-light text-gray-900">
                        <span>{card.value}</span>
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color === 'blue' ? 'bg-blue-600' : card.color === 'yellow' ? 'bg-yellow-500' : card.color === 'green' ? 'bg-green-600' : 'bg-gray-600'}`}>
                      <Icon icon={card.icon} className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                <span>Recent Service Requests</span>
              </h2>
              <Link 
                href="/admin/requests"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                <span>View All</span>
                <Icon icon="material-symbols:arrow-right" className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentRequests.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recentRequests.map((request: any, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        <span>{request.name}</span>
                      </h3>
                      <p className="text-sm text-gray-600">
                        <span>{request.serviceType.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</span>
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      <span>{request.status}</span>
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Icon icon="material-symbols:inbox" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p><span>No service requests yet</span></p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              <span>Quick Actions</span>
            </h2>

            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${action.color === 'blue' ? 'bg-blue-600' : action.color === 'green' ? 'bg-green-600' : 'bg-gray-600'}`}>
                      <Icon icon={action.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        <span>{action.title}</span>
                      </h3>
                      <p className="text-sm text-gray-600">
                        <span>{action.description}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;