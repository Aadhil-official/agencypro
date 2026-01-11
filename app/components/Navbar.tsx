'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from 'cosmic-authentication';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, signIn, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="rounded-full bg-blue-600 p-2">
              <Icon icon="map:travel-agency" className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-medium text-gray-900">
              <span>Agency</span><span className="text-blue-600">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
              >
                <span>{item.label}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/dashboard"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    <span>Hi, {user?.displayName || user?.email}</span>
                  </span>
                  <button
                    onClick={signOut}
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {isAuthenticated && (
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Icon icon="material-symbols:dashboard" className="w-5 h-5" />
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <Icon 
                icon={isMenuOpen ? "material-symbols:close" : "material-symbols:menu"} 
                className="w-6 h-6" 
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 mt-2 rounded-lg shadow-lg"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                  >
                    <span>Dashboard</span>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      <span>{user?.displayName || user?.email}</span>
                    </span>
                    <button
                      onClick={signOut}
                      className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
                    >
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={signIn}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mt-3"
                >
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;