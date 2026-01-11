'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from 'cosmic-authentication';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface Advertisement {
  id: string;
  imageAsset: string;
  link: string;
  placement: string;
  rotation: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdsManagement = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [formData, setFormData] = useState({
    imageAsset: '',
    link: '',
    placement: '',
    rotation: 1,
    isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placementOptions = [
    'homepage-header',
    'homepage-sidebar',
    'services-sidebar', 
    'contact-footer',
    'global-banner'
  ];

  useEffect(() => {
    const authorize = async () => {
      const res = await fetch('/api/admin/authorize');
      if (res.status === 403 || res.status === 401) {
        router.replace('/');
        return false;
      }
      return true;
    };

    const fetchAds = async () => {
      const ok = await authorize();
      if (!ok) return;
      try {
        const response = await fetch('/api/advertisements');
        const data = await response.json();
        setAds(data.advertisements || []);
      } catch (error) {
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [router]);

  const refetchAds = async () => {
    try {
      const response = await fetch('/api/advertisements');
      const data = await response.json();
      setAds(data.advertisements || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = '/api/advertisements';
      const method = editingAd ? 'PUT' : 'POST';
      const body = editingAd ? { id: editingAd.id, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await refetchAds();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving ad:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAd = async (adId: string) => {
    if (!window.confirm('Are you sure you want to delete this advertisement?')) {
      return;
    }

    try {
      const response = await fetch(`/api/advertisements?id=${adId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAds(prev => prev.filter(ad => ad.id !== adId));
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const toggleAdStatus = async (ad: Advertisement) => {
    try {
      const response = await fetch('/api/advertisements', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: ad.id,
          isActive: !ad.isActive
        }),
      });

      if (response.ok) {
        setAds(prev => 
          prev.map(a => 
            a.id === ad.id ? { ...a, isActive: !a.isActive } : a
          )
        );
      }
    } catch (error) {
      console.error('Error updating ad status:', error);
    }
  };

  const editAd = (ad: Advertisement) => {
    setEditingAd(ad);
    setFormData({
      imageAsset: ad.imageAsset,
      link: ad.link,
      placement: ad.placement,
      rotation: ad.rotation,
      isActive: ad.isActive
    });
    setShowCreateForm(true);
  };

  const resetForm = () => {
    setFormData({
      imageAsset: '',
      link: '',
      placement: '',
      rotation: 1,
      isActive: true
    });
    setEditingAd(null);
    setShowCreateForm(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Icon icon="material-symbols:progress-activity" className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="text-lg text-gray-600">Loading advertisements...</span>
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
                <span>Advertisements</span>
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
              <span>Advertisement Management</span>
            </h1>
            <p className="text-gray-600">
              <span>Create and manage advertisement banners for your website.</span>
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
          >
            <Icon icon="material-symbols:add" className="w-5 h-5 mr-2" />
            <span>Create Ad</span>
          </button>
        </motion.div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                <span>{editingAd ? 'Edit Advertisement' : 'Create New Advertisement'}</span>
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon icon="material-symbols:close" className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="imageAsset" className="block text-sm font-medium text-gray-700 mb-2">
                    <span>Image URL *</span>
                  </label>
                  <input
                    type="url"
                    id="imageAsset"
                    name="imageAsset"
                    value={formData.imageAsset}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                    <span>Link URL</span>
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com (optional)"
                  />
                </div>
                <div>
                  <label htmlFor="placement" className="block text-sm font-medium text-gray-700 mb-2">
                    <span>Placement *</span>
                  </label>
                  <select
                    id="placement"
                    name="placement"
                    value={formData.placement}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select placement</option>
                    {placementOptions.map(option => (
                      <option key={option} value={option}>
                        {option.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="rotation" className="block text-sm font-medium text-gray-700 mb-2">
                    <span>Rotation Priority</span>
                  </label>
                  <input
                    type="number"
                    id="rotation"
                    name="rotation"
                    min="1"
                    value={formData.rotation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1 = highest priority"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  <span>Active (show on website)</span>
                </label>
              </div>

              {formData.imageAsset && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span>Preview</span>
                  </label>
                  <img
                    src={formData.imageAsset}
                    alt="Advertisement preview"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={128}
                    className="max-w-sm h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="material-symbols:progress-activity" className="w-5 h-5 mr-2 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Icon icon="material-symbols:save" className="w-5 h-5 mr-2" />
                      <span>Save</span>
                    </>
                  )}
                </button>
                {editingAd && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-gray-600 hover:text-gray-800 px-4 py-2"
                  >
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}

        {/* Ads List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {ads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Preview</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Placement</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Status</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Updated</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ads.map((ad) => (
                    <tr key={ad.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="w-64 h-16 overflow-hidden rounded-lg border border-gray-200">
                          <img
                            src={ad.imageAsset}
                            alt="Banner preview"
                            loading="lazy"
                            decoding="async"
                            width={512}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span>{ad.placement.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleAdStatus(ad)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${ad.isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
                        >
                          <span>{ad.isActive ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span>{formatDate(ad.updatedAt)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => editAd(ad)}
                            className="text-blue-600 hover:text-blue-700 p-1"
                            title="Edit"
                          >
                            <Icon icon="material-symbols:edit" className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteAd(ad.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                            title="Delete"
                          >
                            <Icon icon="material-symbols:delete" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Icon icon="material-symbols:inbox" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p><span>No advertisements yet</span></p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdsManagement;