import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./App";

function Footer() {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  
  // Load user data on component mount
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.name && userData.role) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);
  
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

  // Define navigation links based on user role
  const getNavigationLinks = () => {
    // Common links for all users
    const commonLinks = [
      { to: "/", label: "Home" },
      { to: "/events", label: "Events" },
    ];
    
    // Role-specific links
    if (!user) {
      // Not logged in / Guest user
      return [
        ...commonLinks,
        { to: "/sponsors", label: "Sponsors" },
        { to: "/partners", label: "Ambassadors and Partners" }
      ];
    }
    
    switch (user.role.toLowerCase()) {
      case "student":
        return [
          ...commonLinks,
          { to: "/my-registrations", label: "My Registrations" },
          { to: "/profile", label: "Profile" },
          { to: "/sponsors", label: "Sponsors" },
          { to: "/partners", label: "Partners" }
        ];
        
      case "sponsor":
        return [
          ...commonLinks,
          { to: "/sponsorship/packages", label: "Sponsorship Packages" },
          { to: "/sponsorship/manage", label: "My Sponsorships" },
          { to: "/profile", label: "Profile" },
          { to: "/partners", label: "Partners" }
        ];
        
      case "organizer":
        return [
          ...commonLinks,
          { to: "/events/create", label: "Create Event" },
          { to: "/events/manage", label: "Manage Events" },
          { to: "/profile", label: "Profile" },
          { to: "/sponsors", label: "Sponsors" }
        ];
        
      case "admin":
        return [
          ...commonLinks,
          { to: "/admin/events", label: "Manage Events" },
          { to: "/admin/venues", label: "Manage Venues" },
          { to: "/admin/judges", label: "Manage Judges" },
          { to: "/admin/payments", label: "Verify Payments" },
          { to: "/admin/accommodation", label: "Accommodation Details" }
        ];
        
      default:
        return commonLinks;
    }
  };

  // Get useful links based on user role
  const getUsefulLinks = () => {
    const commonLinks = [
      { href: "https://isb.nu.edu.pk/", label: "FAST-NUCES Website", external: true },
      { href: "/info-booklet.pdf", label: "Information Booklet", external: true }
    ];
    
    // Add role-specific useful links
    if (!user || user.role.toLowerCase() === "student") {
      return [
        ...commonLinks,
        { href: "/ambassador", label: "Become an Ambassador" },
        { href: "/community-partner", label: "Become a Community Partner" }
      ];
    }
    
    return commonLinks;
  };

  const navigationLinks = getNavigationLinks();
  const usefulLinks = getUsefulLinks();
  
  // Show sponsor section only for non-sponsors
  const showSponsorSection = !user || user.role.toLowerCase() !== "sponsor";

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
          
          {/* Navigation - Role-based */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Navigate</div>
            {navigationLinks.map((link, index) => (
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
          
          {/* Useful Links - Role-based */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Useful Links</div>
            {usefulLinks.map((link, index) => (
              link.external ? (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-500 font-inter text-base mb-1 transition" 
                  style={{ color: textColor }}
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={index}
                  to={link.href} 
                  className="hover:text-amber-500 font-inter text-base mb-1 transition" 
                  style={{ color: textColor }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
          
          {/* Become a Sponsor - Only show for non-sponsors */}
          {showSponsorSection && (
            <div className="flex flex-col items-center md:items-start">
              <div className="font-fraunces text-xl font-bold mb-2" style={{ color: textColor }}>Become a Sponsor</div>
              <div className="text-sm mb-3" style={{ color: textColor }}>
                To become an official sponsor for NaSCon'26, please sign up as a sponsor
              </div>
              <Link to="/signup">
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
          )}
        </div>
      </div>
      
      {/* Bottom bar - keep unchanged */}
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
