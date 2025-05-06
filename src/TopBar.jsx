import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { ThemeContext } from "./App";
import { motion, AnimatePresence } from "framer-motion";

function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && typeof user.name === "string" && typeof user.role === "string") {
      return user;
    }
  } catch {}
  return null;
}

function TopBar() {
  const user = getUser();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Determine user role for conditional rendering
  const userRole = user?.role || "undefined"; // If not logged in, role is "undefined"

  const navItems = [
    { to: "/", label: "Home", roles: ["all"] },
    { to: "/events", label: "Events", roles: ["all"] }, 
    { to: "/sponsorship/packages", label: "Sponsorships", roles: ["sponsor"] },
    { to: "/accommodation", label: "Accommodation", roles: ["student"] }, 
    { to: "/profile", label: "Profile", roles: ["student", "sponsor", "organizer", "admin", "judge"] },
    { to: "/admin/events", label: "Admin Panel", roles: ["admin"] }
  ];

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Define primary navigation links visible to all users
  const getPrimaryLinks = () => {
    const baseLinks = [
      { to: "/events", label: "Events" },
      { to: "/gallery", label: "Gallery" },
      { to: "/about", label: "About" }
    ];
    return baseLinks;
  };

  // Define secondary navigation links based on user role
  const getSecondaryLinks = () => {
    if (!user) return [];
    
    const roleSpecificLinks = {
      admin: [
        { to: "/admin/events", label: "Manage Events" },
        { to: "/admin/venues", label: "Manage Venues" },
        { to: "/admin/events", label: "Event Approval" },
        { to: "/admin/judges/add", label: "Add Judge" },
        { to: "/admin/judges", label: "Manage Judges" },
        { to: "/admin/payments", label: "Verify Payments" },
        { to: "/admin/accommodation", label: "Accommodation Details" },
        { to: "/admin/sponsorship/packages", label: "Sponsor Packages" },
        { to: "/admin/payment-approval", label: "Payment Approval" }
      ],
      organizer: [
        { to: "/events/create", label: "Create Event" },
        { to: "/events", label: "My Events" }
      ],
      sponsor: [
        { to: "/sponsorship/packages", label: "View Packages" },
        { to: "/sponsorship/manage", label: "My Sponsorships" }
      ],
      student: [
        { to: "/events", label: "Browse Events" },
        { to: "/my-registrations", label: "My Registrations" },
        { to: "/event/register", label: "Register for Event" },
        { to: "/event/payment", label: "Event Payment" },
        { to: "/accommodation", label: "My Accommodation" }
      ],
      judge: [
        { to: "/judge/events", label: "Assigned Events" },
        { to: "/judge/scoring-history", label: "Scoring History" }
      ]
    };
    
    return roleSpecificLinks[userRole] || [];
  };

  const primaryLinks = getPrimaryLinks();
  const secondaryLinks = getSecondaryLinks();
  
  // Button styles
  const buttonStyle = {
    padding: "12px 24px",
    background: "linear-gradient(to right, #4E2A84, #FFC72C)",
    color: "#fff",
    boxShadow: "0 4px 24px #4E2A8422, 0 1.5px 6px #FFC72C33",
    borderRadius: "0.75rem",
    fontFamily: "Inter, Fraunces, sans-serif",
    fontWeight: 700,
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "transform 0.18s",
    display: "inline-block",
    textDecoration: "none"
  };
  
  const logoutButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(to left, #4E2A84, #FFC72C)",
  };

  const themeButtonStyle = {
    border: "none",
    outline: "none",
    borderRadius: "50%",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      theme === "dark"
        ? "0 0 16px 4px #FFD95E, 0 0 0 2px #FFF8E1"
        : "0 0 16px 4px #4E2A84, 0 0 0 2px #18122b",
    background:
      theme === "dark"
        ? "radial-gradient(circle at 60% 40%, #FFD95E 60%, #FFF8E1 100%)"
        : "radial-gradient(circle at 60% 40%, #18122b 60%, #4E2A84 100%)",
    transition: "background 0.4s, box-shadow 0.4s",
    cursor: "pointer"
  };

  return (
    <nav
      className="flex items-center justify-between px-8 py-4 fixed w-full top-0 z-50"
      style={{
        background: theme === "dark"
          ? "rgba(34, 24, 56, 0.92)"
          : "rgba(255,255,255,0.85)",
        color: "var(--text-primary)",
        backdropFilter: "blur(8px)"
      }}
    >
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={36} className="!mb-0" />
          <span
            className="font-fraunces text-3xl font-extrabold"
            style={{ color: theme === "dark" ? "#FFC72C" : "var(--text-secondary)" }}
          >
            NaSCon
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10 ml-8">
          {/* Primary links visible to everyone */}
          {primaryLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="font-inter font-extrabold transition duration-200 pb-1"
              style={{ color: theme === "dark" ? "#FFC72C" : "var(--text-secondary)" }}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Secondary links dropdown for authenticated users */}
          {user && secondaryLinks.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="font-inter font-extrabold transition duration-200 pb-1 flex items-center gap-1"
                style={{ color: theme === "dark" ? "#FFC72C" : "var(--text-secondary)" }}
              >
                {userRole === "admin" ? "Admin" : "Manage"}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={menuOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 glass-card rounded-xl overflow-hidden"
                    style={{
                      background: theme === "dark" ? "rgba(42, 30, 77, 0.95)" : "rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
                      minWidth: "180px",
                      zIndex: 100
                    }}
                  >
                    {secondaryLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.to}
                        className="block px-4 py-3 font-inter transition-colors whitespace-nowrap"
                        style={{ 
                          color: theme === "dark" ? "#f5e9c9" : "#18122b",
                          borderBottom: index < secondaryLinks.length - 1 ? 
                            `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}` : 
                            "none"
                        }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          {/* Profile link for authenticated users */}
          {user && (
            <Link
              to="/profile"
              className="font-inter font-extrabold transition duration-200 pb-1"
              style={{ color: theme === "dark" ? "#FFC72C" : "var(--text-secondary)" }}
            >
              Profile
            </Link>
          )}
        </div>
      </div>
      
      {/* Right side buttons with consistent spacing */}
      <div className="flex items-center">
        {/* Theme toggle button */}
        <button
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          style={themeButtonStyle}
          className="mr-4"
        >
          {theme === "dark" ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" fill="#FFD95E" />
              <g stroke="#FFD95E" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </g>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" fill="#18122b" />
              <path
                d="M16 12c0 2.21-1.79 4-4 4a4 4 0 0 1 0-8c.34 0 .67.04 1 .1A5 5 0 0 0 16 12z"
                fill="#FFF8E1"
              />
            </svg>
          )}
        </button>
        
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="hover:scale-105 transition-all mr-4"
              style={buttonStyle}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="hover:scale-105 transition-all"
              style={logoutButtonStyle}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="hover:scale-105 transition-all"
            style={buttonStyle}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default TopBar;
