'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import PublicLayout from '@/app/components/PublicLayout';

const ServicesPage = () => {
  const services = [
    {
      id: 'job-placement',
      icon: 'material-symbols:public',
      title: 'Overseas Job Placement',
      description: 'Recruitment and placement for healthcare, hospitality, construction, retail, and more.',
      features: [
        'Skilled & Semi-skilled Roles',
        'Trusted Global Employers',
        'Ethical Recruitment',
        'Offer Letter Guidance',
        'Interview Preparation',
        'Post-Selection Support'
      ],
      pricing: 'Custom per role/country'
    },
    {
      id: 'visa-permits',
      icon: 'material-symbols:approval',
      title: 'Visa & Work Permits',
      description: 'Complete documentation support for visas, work permits, and medicals.',
      features: [
        'Visa Application Prep',
        'Work Permit Assistance',
        'Medical & PCC Guidance',
        'Document Checklists',
        'Appointment Scheduling',
        'Status Updates'
      ],
      pricing: 'Country-specific'
    },
    {
      id: 'pre-departure',
      icon: 'material-symbols:school',
      title: 'Pre-Departure Training',
      description: 'Orientation on safety, culture, language basics, and contract awareness.',
      features: [
        'Safety & Compliance',
        'Cultural Awareness',
        'Basic Language Tips',
        'Rights & Responsibilities',
        'Travel Readiness',
        'Onboarding Checklist'
      ],
      pricing: 'Included with placement'
    },
    {
      id: 'employer-services',
      icon: 'material-symbols:business-center',
      title: 'Employer Hiring Services',
      description: 'End-to-end recruitment for international employers seeking qualified talent.',
      features: [
        'Job Description Mapping',
        'Candidate Sourcing',
        'Screening & Shortlisting',
        'Interview Coordination',
        'Offer & Onboarding',
        'Compliance Documentation'
      ],
      pricing: 'Retainer or success fee'
    },
    {
      id: 'counseling',
      icon: 'material-symbols:psychology',
      title: 'Career Counseling',
      description: 'Personalized guidance on roles, countries, and eligibility.',
      features: [
        'Profile Assessment',
        'Country Fit Analysis',
        'Role Matching',
        'Risk & Compliance Advice',
        'Document Planning',
        'Next-step Roadmap'
      ],
      pricing: 'Free consultation'
    },
    {
      id: 'attestation',
      icon: 'material-symbols:description',
      title: 'Document Attestation',
      description: 'Support for attestation, translation, and notarization where required.',
      features: [
        'Education Certificates',
        'Experience Letters',
        'Translation Services',
        'Notary & Embassy Liaison',
        'Courier Handling',
        'Tracking & Updates'
      ],
      pricing: 'Per document'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Profile & Goals',
      description: 'We assess your skills, target country, and eligibility.'
    },
    {
      step: '02',
      title: 'Shortlist & Apply',
      description: 'We shortlist roles and submit your application.'
    },
    {
      step: '03',
      title: 'Selection & Visa',
      description: 'Interview preparation, selection, and visa filing.'
    },
    {
      step: '04',
      title: 'Pre-Departure & Join',
      description: 'Training, tickets, onboarding, and support abroad.'
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
              <span>Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <span>Everything you need for a safe, compliant, and successful move overseas.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                id={service.id}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon icon={service.icon} className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">
                    <span>{service.title}</span>
                  </h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  <span>{service.description}</span>
                </p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <Icon icon="material-symbols:check-circle" className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium">
                      <span>{service.pricing}</span>
                    </span>
                    <Link href="/request-service" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group">
                      <span>Request Info</span>
                      <Icon icon="material-symbols:arrow-right" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              <span>Our Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <span>A proven pathway to secure your global opportunity.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white text-xl font-medium mb-6">
                  <span>{step.step}</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  <span>{step.title}</span>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  <span>{step.description}</span>
                </p>
                
                {/* Connector line for desktop */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-gray-300 transform -translate-x-8"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              <span>Start Your Overseas Journey</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              <span>Talk to our specialists today and get a clear plan for getting hired abroad.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-service">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Request Service</span>
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
                >
                  <span>Contact Us</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServicesPage;