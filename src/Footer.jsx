import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";
import Logo from "./Logo";

function Footer() {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Track location changes
  
  // Load user data on component mount and when location changes
  useEffect(() => {
    // Function to get current user from localStorage
    const getCurrentUser = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && typeof userData.name === "string" && typeof userData.role === "string") {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    };

    // Get user data whenever location changes (including login/logout)
    getCurrentUser();
    
    // Listen for custom auth-change event
    const handleAuthChange = () => getCurrentUser();
    window.addEventListener("auth-change", handleAuthChange);
    
    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [location.pathname]); // Re-run when route changes
  
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

  // Navigation links with role-based visibility
  const navLinks = [
    { to: "/", label: "Home", roles: [] }, // empty array = visible to all
    { to: "/events", label: "Events", roles: [] },
    { to: "/sponsorship/packages", label: "Sponsorships", roles: ["sponsor"] },
    { to: "/my-registrations", label: "My Registrations", roles: ["student"] },
    { to: "/accommodation", label: "Accommodation", roles: ["student"] },
    { to: "/profile", label: "Profile", roles: ["student", "sponsor", "organizer", "admin", "judge"] },
    { to: "/sponsors", label: "Sponsors", roles: [] },
    { to: "/partners", label: "Ambassadors and Partners", roles: [] }
  ];

  // Filter links based on user role
  const visibleLinks = navLinks.filter(link => {
    if (link.roles.length === 0) return true; // Always show if no role restriction
    if (!user) return false; // Hide if role-restricted and no user
    return link.roles.includes(user.role);
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Dispatch an auth-change event to notify components
    window.dispatchEvent(new Event("auth-change"));
    
    toast.success("You have been logged out!");
    toast.info("You may now signup as a sponsor!");
    navigate("/login");
  };

  return (
    <footer className="w-full mt-16">
      <div
        className="w-full px-4 md:px-12 py-10 backdrop-blur-lg shadow-inner border-t border-b"
        style={bgStyle}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
            {/* Reach Out */}
            <div className="flex flex-col items-center md:items-start">
              <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Reach Out</div>
              <div className="text-sm mb-1" style={{ color: textColor }}>We'd be glad to hear from you!</div>
              <div className="text-sm font-mono" style={{ color: textColor }}>info@nascon.com.pk</div>
              <div className="text-sm font-mono" style={{ color: textColor }}>051-111-128-128</div>
              <div className="text-sm mt-2" style={{ color: textColor }}>For any website related query</div>
              <div className="text-sm font-mono" style={{ color: textColor }}>web-support@nascon.com.pk</div>
            </div>
            
            {/* Navigation - Role-based */}
            <div className="flex flex-col items-center md:items-start">
              <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Navigate</div>
              {visibleLinks.map((link, index) => (
                <Link 
                  key={index}
                  to={link.to} 
                  className="hover:text-amber-500 font-inter text-base mb-1 transition" 
                  style={{ color: textColor }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Useful Links */}
            <div className="flex flex-col items-center md:items-start">
              <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Useful Links</div>
              <a href="https://isb.nu.edu.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>FAST-NUCES Website</a>
              <a href="/info-booklet.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Information Booklet</a>
              <a href="/ambassador" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Become an Ambassador</a>
              <a href="/community-partner" className="hover:text-amber-500 font-inter text-base mb-1 transition" style={{ color: textColor }}>Become a Community Partner</a>
            </div>
            
            {/* Become a Sponsor - Changed to logout functionality */}
            <div className="flex flex-col items-center md:items-start">
              <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Become a Sponsor</div>
              <div className="text-sm mb-3" style={{ color: textColor }}>
                To become an official sponsor for NaSCon'26, please sign up as a sponsor
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg font-fraunces font-semibold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all border-b-4 border-purple-900"
                style={{
                  boxShadow: "0 2px 12px #4E2A8433",
                  borderBottomWidth: "3px",
                }}
              >
                Become a Sponsor
              </button>
            </div>
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