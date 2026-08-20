'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from 'cosmic-authentication';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  projectDetails: string;
  budget: string;
  timeline: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AdminRequestsPage = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    const authorize = async () => {
      const res = await fetch('/api/admin/authorize');
      if (res.status === 403 || res.status === 401) {
        router.replace('/');
        return false;
      }
      return true;
    };

    const fetchRequests = async () => {
      const ok = await authorize();
      if (!ok) return;

      try {
        const response = await fetch('/api/service-requests');
        const data = await response.json();
        setRequests(data.serviceRequests || []);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [router]);

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    setUpdatingStatus(requestId);
    try {
      const response = await fetch('/api/service-requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: requestId,
          status: newStatus
        }),
      });

      if (response.ok) {
        setRequests(prev =>
          prev.map(req =>
            req.id === requestId ? { ...req, status: newStatus } : req
          )
        );
      }
    } catch (error) {
      console.error('Error updating request status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const deleteRequest = async (requestId: string) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return;
    }

    try {
      const response = await fetch(`/api/service-requests?id=${requestId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRequests(prev => prev.filter(req => req.id !== requestId));
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRequests = requests.filter(req => {
    if (statusFilter === 'all') return true;
    return req.status === statusFilter;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Icon icon="material-symbols:progress-activity" className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="text-lg text-gray-600">Loading requests...</span>
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
                <span>Service Requests</span>
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
          className="mb-8"
        >
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            <span>Service Requests</span>
          </h1>
          <p className="text-gray-600">
            <span>Manage and respond to customer service inquiries.</span>
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Requests', value: stats.total, icon: 'material-symbols:request-quote', color: 'blue' },
            { label: 'Pending', value: stats.pending, icon: 'material-symbols:pending', color: 'yellow' },
            { label: 'In Progress', value: stats.inProgress, icon: 'material-symbols:autorenew', color: 'blue' },
            { label: 'Completed', value: stats.completed, icon: 'material-symbols:check-circle', color: 'green' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span>{stat.label}</span>
                  </p>
                  <p className="text-2xl font-light text-gray-900">
                    <span>{stat.value}</span>
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-600' :
                    stat.color === 'yellow' ? 'bg-yellow-500' :
                      stat.color === 'green' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                  <Icon icon={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6 flex flex-wrap gap-2"
        >
          {[
            { label: 'All', value: 'all' },
            { label: 'Pending', value: 'pending' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Completed', value: 'completed' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${statusFilter === filter.value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <span>{filter.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {filteredRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Customer</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Service Type</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Budget</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Timeline</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Status</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Created</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            <span>{request.name}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            <span>{request.email}</span>
                          </div>
                          {request.phone && (
                            <div className="text-sm text-gray-500">
                              <span>{request.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span>{request.serviceType.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span>{request.budget}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span>{request.timeline}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={request.status}
                          onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                          disabled={updatingStatus === request.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)} cursor-pointer`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span>{formatDate(request.createdAt)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteRequest(request.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete request"
                        >
                          <Icon icon="material-symbols:delete" className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Icon icon="material-symbols:inbox" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>
                <span>
                  {statusFilter === 'all'
                    ? 'No service requests yet'
                    : `No ${statusFilter} requests`}
                </span>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminRequestsPage;
