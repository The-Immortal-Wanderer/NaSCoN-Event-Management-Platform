import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { ThemeContext } from "./App";

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
  
  // Determine user role for conditional rendering
  const userRole = user?.role || "undefined"; // If not logged in, role is "undefined"

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  // Define navigation links based on role
  const getNavLinks = () => {
    // Base links for all users
    const baseLinks = [
      { to: "/events", label: "Events" },
      { to: "/gallery", label: "Gallery" },
      { to: "/about", label: "About" }
    ];
    
    // Role-specific links
    const roleSpecificLinks = {
      admin: [
        { to: "/sponsorship/packages", label: "Sponsorships" },
        { to: "/admin/events", label: "Manage Events" },
        { to: "/admin/venues", label: "Venues" },
        { to: "/profile", label: "Profile" }
      ],
      organizer: [
        { to: "/sponsorship/packages", label: "Sponsorships" },
        { to: "/events/manage", label: "My Events" },
        { to: "/profile", label: "Profile" }
      ],
      sponsor: [
        { to: "/sponsorship/packages", label: "Sponsorships" },
        { to: "/sponsorship/manage", label: "My Sponsorships" },
        { to: "/profile", label: "Profile" }
      ],
      student: [
        { to: "/my-registrations", label: "My Registrations" },
        { to: "/profile", label: "Profile" }
      ],
      undefined: [] // No additional links for not logged in users
    };
    
    // Return combined links based on role
    return [...baseLinks, ...(roleSpecificLinks[userRole] || [])];
  };

  const navLinks = getNavLinks();

  return (
    <nav
      className="flex items-center justify-between px-8 py-4"
      style={{
        background: theme === "dark"
          ? "rgba(34, 24, 56, 0.92)"
          : "rgba(255,255,255,0.85)",
        color: "var(--text-primary)",
        backdropFilter: "blur(8px)",
        zIndex: 10,
        position: "relative",
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
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="font-inter font-extrabold transition duration-200 pb-1"
              style={{ color: theme === "dark" ? "#FFC72C" : "var(--text-secondary)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          style={{
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
            cursor: "pointer",
          }}
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
              className="rounded-xl font-bold text-base shadow-lg hover:scale-105 transition-all"
              style={{
                padding: "12px 28px",
                background: "linear-gradient(to right, #4E2A84, #FFC72C)",
                color: "#fff",
                boxShadow: "0 4px 24px #4E2A8422, 0 1.5px 6px #FFC72C33",
                marginRight: "0.5rem",
                textDecoration: "none",
                fontFamily: "Inter, Fraunces, sans-serif",
                fontWeight: 700,
                border: "none",
                fontSize: "1rem",
                transition: "transform 0.18s",
                display: "inline-block"
              }}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-xl font-bold text-base shadow-lg hover:scale-105 transition-all"
              style={{
                padding: "12px 28px",
                background: "linear-gradient(to left, #4E2A84, #FFC72C)",
                color: "#fff",
                boxShadow: "0 4px 24px #4E2A8422, 0 1.5px 6px #FFC72C33",
                marginRight: "0.5rem",
                textDecoration: "none",
                fontFamily: "Inter, Fraunces, sans-serif",
                fontWeight: 700,
                border: "none",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "transform 0.18s",
                display: "inline-block"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="rounded-xl font-bold text-base shadow-lg hover:scale-105 transition-all"
            style={{
              padding: "12px 28px",
              background: "linear-gradient(to right, #4E2A84, #FFC72C)",
              color: "#fff",
              boxShadow: "0 4px 24px #4E2A8422, 0 1.5px 6px #FFC72C33",
              textDecoration: "none",
              fontFamily: "Inter, Fraunces, sans-serif",
              fontWeight: 700,
              border: "none",
              fontSize: "1rem",
              transition: "transform 0.18s",
              display: "inline-block"
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default TopBar;
