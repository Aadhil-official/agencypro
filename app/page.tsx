'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const AdBanner = ({ placement }: { placement: string }) => {
  const [ads, setAds] = React.useState([]);
  const [currentAdIndex, setCurrentAdIndex] = React.useState(0);

  React.useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(`/api/advertisements?placement=${placement}&activeOnly=true`);
        const data = await response.json();
        if (data.advertisements) {
          setAds(data.advertisements);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, [placement]);

  React.useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads.length]);

  if (ads.length === 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentAd = ads[currentAdIndex] as any;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
    >
      {currentAd.link ? (
        <Link href={currentAd.link}>
          <img
            src={currentAd.imageAsset}
            alt="Advertisement banner"
            loading="lazy"
            decoding="async"
            width={1200}
            height={384}
            className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </Link>
      ) : (
        <img
          src={currentAd.imageAsset}
          alt="Advertisement banner"
          loading="lazy"
          decoding="async"
          width={1200}
          height={384}
          className="w-full h-32 object-cover rounded-lg"
        />
      )}
    </motion.div>
  );
};

const HomePage = () => {
  const services = [
    {
      icon: 'material-symbols:public',
      title: 'Overseas Job Placement',
      description: 'Connecting skilled candidates with trusted employers worldwide.'
    },
    {
      icon: 'material-symbols:approval',
      title: 'Visa & Work Permits',
      description: 'Complete assistance for visas, work permits, and documentation.'
    },
    {
      icon: 'material-symbols:school',
      title: 'Pre-Departure Training',
      description: 'Orientation, compliance, and cultural training for safe deployment.'
    },
    {
      icon: 'material-symbols:headset-mic',
      title: 'Candidate Support',
      description: 'End-to-end guidance from application to onboarding and beyond.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight">
              <span>Trusted Foreign Employment Agency</span><br />
              <span className="text-blue-600">Jobs Abroad. Done Right.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
              <span>We match qualified talent with reputable overseas employers and handle visas, permits, and pre-departure training—safely and transparently.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/request-service">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <span>Request Assistance</span>
                </motion.button>
              </Link>
              
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-xl hover:shadow-2xl border border-gray-200/50"
                >
                  <span>Explore Services</span>
                </motion.button>
              </Link>
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <Suspense fallback={<div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>}>
                <AdBanner placement="homepage-header" />
              </Suspense>
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-20 hidden lg:block"
        />
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-32 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-20 hidden lg:block"
        />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              <span>Our Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <span>End-to-end overseas employment services for candidates and employers.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                  <Icon icon={service.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  <span>{service.title}</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  <span>{service.description}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Advertisement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                <span>Ready to Work Overseas?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                <span>Tell us your target country and job role. Our specialists will guide you through documentation and placement.</span>
              </p>
              <Link href="/request-service">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Start Your Application</span>
                </motion.button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Suspense fallback={<div className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>}>
                <AdBanner placement="homepage-sidebar" />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;