'use client';

import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import PublicLayout from '@/app/components/PublicLayout';

const ServiceRequestPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const serviceTypes = [
    { value: 'job-placement', label: 'Overseas Job Placement' },
    { value: 'visa-processing', label: 'Visa & Work Permit Processing' },
    { value: 'pre-departure-training', label: 'Pre-Departure Training' },
    { value: 'employer-hiring', label: 'Employer Hiring Inquiry' },
    { value: 'document-attestation', label: 'Document Attestation' },
    { value: 'other', label: 'Other (specify in details)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message || 'Service request submitted successfully! We\'ll contact you within 24 hours.');
        setFormData({ name: '', email: '', serviceType: '', details: '' });
      } else {
        setSubmitMessage(result.error || 'Sorry, there was an error submitting your request. Please try again.');
      }
    } catch {
      setSubmitMessage('Sorry, there was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: 'material-symbols:verified',
      title: 'Licensed & Compliant',
      description: 'We follow all regulations and ethical recruitment standards.'
    },
    {
      icon: 'material-symbols:schedule',
      title: 'Fast Processing',
      description: 'Optimized workflows to speed up your visa and placement.'
    },
    {
      icon: 'material-symbols:shield-lock',
      title: 'Transparent Process',
      description: 'Clear fees, clear steps, and dedicated support throughout.'
    },
    {
      icon: 'material-symbols:support',
      title: 'End-to-End Care',
      description: 'From first contact to onboarding abroad, we stay with you.'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section 
        className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
              <span>Request Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <span>Tell us about your needs and country preference. We&apos;ll guide you with the right documents and next steps.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form & Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Request Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200/50">
                <h2 className="text-3xl font-light text-gray-900 mb-6">
                  <span>Tell Us About Your Case</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  <span>Fill out the form below and our team will reach out with tailored guidance and timelines.</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                      <span>Service Type *</span>
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a service type</option>
                      {serviceTypes.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                      <span>Details *</span>
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Preferred country, job role, experience, and any questions you have..."
                    />
                  </div>

                  {submitMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        submitMessage.includes('error') || submitMessage.includes('Sorry')
                          ? 'bg-red-50 text-red-600 border border-red-200' 
                          : 'bg-green-50 text-green-600 border border-green-200'
                      }`}
                    >
                      <span>{submitMessage}</span>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon icon="material-symbols:progress-activity" className="w-5 h-5 mr-2 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Icon icon="material-symbols:rocket-launch" className="w-5 h-5 mr-2" />
                        <span>Submit Service Request</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Benefits & Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-light text-gray-900 mb-6">
                  <span>Why Choose Us?</span>
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  <span>We&apos;re licensed, transparent, and experienced in safe overseas recruitment. Here&apos;s what you can expect.</span>
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Icon icon={benefit.icon} className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        <span>{benefit.title}</span>
                      </h3>
                      <p className="text-gray-600">
                        <span>{benefit.description}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Process Steps */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/50">
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  <span>What Happens Next?</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      <span>1</span>
                    </div>
                    <span className="text-gray-600">
                      <span>We review your request within 24 hours</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      <span>2</span>
                    </div>
                    <span className="text-gray-600">
                      <span>Schedule a consultation to discuss details</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      <span>3</span>
                    </div>
                    <span className="text-gray-600">
                      <span>Provide a detailed checklist and timeline</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      <span>4</span>
                    </div>
                    <span className="text-gray-600">
                      <span>Begin visa processing and placement</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

const ServiceRequestPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceRequestPage />
    </Suspense>
  );
};

export default ServiceRequestPageWithSuspense;