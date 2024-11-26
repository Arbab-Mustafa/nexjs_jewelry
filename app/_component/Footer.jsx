"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">I. Keesje & Son</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm">© 2024</span>
              </li>
            </ul>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <ul className="space-y-2">
              <li className="text-sm">Diamond Bourse Building</li>
              <li className="text-sm">Pelikaanstraat 78</li>
              <li className="text-sm">2018 Antwerpen</li>
              <li className="text-sm">Belgium</li>
            </ul>
          </div>

          {/* Contact or Additional Links (You can add any other links here if needed) */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              {/* Example Links (You can replace them with actual links) */}
              <li>
                <a
                  href="mailto:info@example.com"
                  className="text-sm hover:text-gray-400"
                >
                  info@example.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+123456789"
                  className="text-sm hover:text-gray-400"
                >
                  +1 234 567 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links (Optional) */}
        <div className="mt-8 text-center">
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="https://www.facebook.com/keesje.kisdiamonds"
                className="text-sm hover:text-gray-400"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/keesjehenri/"
                className="text-sm hover:text-gray-400"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/henri-keesje-23ab2a57/?originalSubdomain=be"
                className="text-sm hover:text-gray-400"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
