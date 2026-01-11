'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Job Placement', href: '/services#job-placement' },
        { label: 'Visa & Work Permits', href: '/services#visa-permits' },
        { label: 'Pre-Departure Training', href: '/services#pre-departure' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Request Service', href: '/request-service' },
        { label: 'Help Center', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
      ]
    }
  ];

  return (
    <footer className="bg-white border-top border-gray-200 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="rounded-full bg-blue-600 p-2">
                  <Icon icon="map:travel-agency" className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-medium text-gray-900">
                  <span>Agency</span><span className="text-blue-600">Pro</span>
                </span>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed">
                <span>Licensed foreign employment agency helping candidates work abroad safely and transparently, from placement to pre-departure training.</span>
              </p>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <Icon icon="mdi:facebook" className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <Icon icon="mdi:twitter" className="w-5 h-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <Icon icon="mdi:linkedin" className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <Icon icon="mdi:instagram" className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-gray-900 font-medium">
                  <span>{section.title}</span>
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                      >
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            <span>© {currentYear} AgencyPro. All rights reserved.</span>
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
              <span>Privacy Policy</span>
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
              <span>Terms of Service</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;