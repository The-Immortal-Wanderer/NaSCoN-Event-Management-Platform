import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./App";

function Footer() {
  const { theme } = useContext(ThemeContext);
  
  const textColor = theme === "dark" ? "#FFC72C" : "#4E2A84";
  const hoverColor = "#FFC72C";
  const bgStyle = {
    background: theme === "dark" ? "rgba(26, 19, 51, 0.7)" : "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(8px)",
    borderTop: theme === "dark" ? "1px solid #3A2A5D" : "1px solid #E5E5E5",
    borderBottom: theme === "dark" ? "1px solid #3A2A5D" : "1px solid #E5E5E5",
    boxShadow: theme === "dark" 
      ? "0 2px 24px 0 rgba(26, 19, 51, 0.5), 0 1.5px 6px rgba(255, 199, 44, 0.2)"
      : "0 2px 24px 0 rgba(78, 42, 132, 0.1), 0 1.5px 6px rgba(255, 199, 44, 0.2)",
  };

  return (
    <footer className="w-full mt-16">
      <div
        className="w-full px-4 md:px-12 py-10 backdrop-blur-lg shadow-inner border-t border-b"
        style={bgStyle}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          {/* Reach Out */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Reach Out</div>
            <div className="text-sm mb-1" style={{ color: textColor }}>We'd be glad to hear from you!</div>
            <div className="text-sm font-mono" style={{ color: textColor }}>info@nascon.com.pk</div>
            <div className="text-sm font-mono" style={{ color: textColor }}>051-111-128-128</div>
            <div className="text-sm mt-2" style={{ color: textColor }}>For any website related query</div>
            <div className="text-sm font-mono" style={{ color: textColor }}>web-support@nascon.com.pk</div>
          </div>
          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Navigate</div>
            <Link to="/" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Home</Link>
            <Link to="/events" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Events</Link>
            <Link to="/sponsorship/packages" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Sponsorships</Link>
            <Link to="/my-registrations" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>My Registrations</Link>
            <Link to="/profile" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Profile</Link>
            <Link to="/sponsors" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Sponsors</Link>
            <Link to="/partners" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Ambassadors and Partners</Link>
          </div>
          {/* Useful Links */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Useful Links</div>
            <a href="https://isb.nu.edu.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>FAST-NUCES Website</a>
            <a href="/info-booklet.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Information Booklet</a>
            <a href="/ambassador" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Become an Ambassador</a>
            <a href="/community-partner" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Become a Community Partner</a>
          </div>
          {/* Become a Sponsor */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Become a Sponsor</div>
            <div className="text-sm mb-3" style={{ color: textColor }}>
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
