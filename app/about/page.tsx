'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import PublicLayout from '@/app/components/PublicLayout';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Managing Director',
      image: 'https://i.pravatar.cc/400?u=sarah-johnson',
      bio: 'Leads compliance and global partnerships with 12+ years in overseas recruitment.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://i.pravatar.cc/400?u=michael-chen',
      bio: 'Streamlines documentation, visa processing, and deployment logistics.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Training Lead',
      image: 'https://i.pravatar.cc/400?u=emma-rodriguez',
      bio: 'Designs pre-departure programs focused on safety, culture, and onboarding.'
    },
    {
      name: 'David Kim',
      role: 'Employer Relations',
      image: 'https://i.pravatar.cc/400?u=david-kim',
      bio: 'Builds and maintains relationships with international employers.'
    }
  ];

  const values = [
    {
      icon: 'material-symbols:verified',
      title: 'Compliance',
      description: 'We operate with proper licenses and ethical recruitment practices.'
    },
    {
      icon: 'material-symbols:handshake',
      title: 'Trust',
      description: 'Transparent process and clear communication at every step.'
    },
    {
      icon: 'material-symbols:high-quality',
      title: 'Quality',
      description: 'We match candidates to the right roles for long-term success.'
    },
    {
      icon: 'material-symbols:support-agent',
      title: 'Support',
      description: 'Continuous support for candidates and employers.'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section 
        className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
              <span>About Our Agency</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <span>We help skilled professionals build careers abroad by providing safe, transparent, and end-to-end recruitment services.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                <span>Our Story</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <span>Founded to bridge opportunities between global employers and qualified talent, our mission is to make overseas employment safe and accessible.</span>
                </p>
                <p>
                  <span>We partner with licensed authorities and reputable organizations to ensure every candidate experiences a transparent and dignified recruitment process.</span>
                </p>
                <p>
                  <span>From the first consultation to your first day abroad, our team supports you with care, clarity, and compliance.</span>
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-light text-blue-600 mb-2">
                      <span>2k+</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Candidates Placed</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-blue-600 mb-2">
                      <span>150+</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Employer Partners</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-blue-600 mb-2">
                      <span>25+</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Destination Countries</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-blue-600 mb-2">
                      <span>8</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              <span>Our Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <span>The principles guiding our candidate-first, compliance-driven approach.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                  <Icon icon={value.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  <span>{value.title}</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  <span>{value.description}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              <span>Meet Our Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <span>The people ensuring your journey abroad is safe and successful.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="relative mb-6 mx-auto w-48 h-48 lg:w-56 lg:h-56">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    width={224}
                    height={224}
                    className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  <span>{member.name}</span>
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  <span>{member.role}</span>
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span>{member.bio}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;