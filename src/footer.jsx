import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Globe, Heart } from 'lucide-react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          {/* Left Column - About */}
          <div className="flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent">
              Treasury Track
            </h3>
            <p className="text-gray-400 text-sm text-center md:text-left">
              A financial management solution developed by the Treasury Team of ACES PVGCOET.
              Track your expenses, manage your budget, and achieve your financial goals.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="flex-col items-center">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent">
              Quick Links
            </h3>
            <div className="flex-col items-center space-y-2">
              <a 
                href="https://www.pvgcoet.ac.in/students-association-5/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover-text-white transition-colors flex items-center gap-2"
              >
                <Globe size={16} />
                ACES PVGCOET
              </a>
              <a 
                href="https://www.instagram.com/acespvg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover-text-white transition-colors flex items-center gap-2"
              >
                <Instagram size={16} />
                @acespvg
              </a>
              <a 
                href="https://www.pvgcoet.ac.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover-text-white transition-colors flex items-center gap-2"
              >
                <Globe size={16} />
                PVGCOET
              </a>
            </div>
          </div>

          {/* Right Column - Developer Info */}
          <div className="flex-col items-center md:items-end">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent">
              Developed By
            </h3>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Treasury Team
              <br />
              Association of Computer Engineering Students
              <br />
              PVG's COET, Pune
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Treasury Track. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2 mt-4 md:mt-0">
              Made with <Heart size={16} className="text-red-500" /> by ACES PVGCOET
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;