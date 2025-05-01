import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full mt-16">
      <div
        className="w-full px-4 md:px-12 py-10 bg-white/70 backdrop-blur-lg border-t border-b border-amber-100 shadow-inner"
        style={{
          boxShadow: "0 2px 24px 0 #4E2A8422, 0 1.5px 6px #FFC72C33",
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          {/* Reach Out */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold text-gray-800 mb-2">Reach Out</div>
            <div className="text-gray-700 text-sm mb-1">We'd be glad to hear from you!</div>
            <div className="text-purple-900 text-sm font-mono">info@nascon.com.pk</div>
            <div className="text-purple-900 text-sm font-mono">051-111-128-128</div>
            <div className="text-gray-700 text-sm mt-2">For any website related query</div>
            <div className="text-purple-900 text-sm font-mono">web-support@nascon.com.pk</div>
          </div>
          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold text-gray-800 mb-2">Navigate</div>
            <Link to="/" className="text-gray-800 hover:text-amber-500 font-inter text-base mb-1 transition">Home</Link>
            <Link to="/events" className="text-gray-800 hover:text-amber-500 font-inter text-base mb-1 transition">Events</Link>
            <Link to="/sponsors" className="text-gray-800 hover:text-amber-500 font-inter text-base mb-1 transition">Sponsors</Link>
            <Link to="/partners" className="text-gray-800 hover:text-amber-500 font-inter text-base mb-1 transition">Ambassadors and Partners</Link>
          </div>
          {/* Useful Links */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold text-gray-800 mb-2">Useful Links</div>
            <a href="https://isb.nu.edu.pk/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-amber-500 font-inter text-base mb-1 transition">FAST-NUCES Website</a>
            <a href="/info-booklet.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-amber-500 font-inter text-base mb-1 transition">Information Booklet</a>
            <a href="/ambassador" className="text-gray-800 hover:text-amber-500 font-inter text-base mb-1 transition">Become an Ambassador</a>
            <a href="/community-partner" className="text-gray-800 hover:text-amber-500 font-inter text-base mb-1 transition">Become a Community Partner</a>
          </div>
          {/* Become a Sponsor */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold text-gray-800 mb-2">Become a Sponsor</div>
            <div className="text-gray-700 text-sm mb-3">
              To become an official sponsor for NaSCon'26, please give us some information and we will reach you out
            </div>
            <Link to="/sponsors/apply">
              <button
                className="px-6 py-2 rounded-lg font-fraunces font-semibold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all border-b-4 border-purple-900"
                style={{
                  boxShadow: "0 2px 12px #4E2A8433",
                  borderBottomWidth: "3px",
                }}
              >
                Become a Sponsor
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="w-full bg-gradient-to-r from-purple-900 to-amber-400 flex flex-col md:flex-row items-center justify-between px-6 py-3">
        <div className="text-white text-xs font-ibm-mono">
          © NaSCon 2026. All Rights Reserved.
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="https://facebook.com/nasconofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f text-white text-lg hover:text-amber-300"></i>
          </a>
          <a href="https://instagram.com/nasconofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram text-white text-lg hover:text-amber-300"></i>
          </a>
          <a href="https://linkedin.com/company/nascon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in text-white text-lg hover:text-amber-300"></i>
          </a>
          <a href="https://youtube.com/nasconofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i className="fab fa-youtube text-white text-lg hover:text-amber-300"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
