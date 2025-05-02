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

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav
      className="flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 10,
        position: "relative",
        ...(theme === "dark"
          ? {
              background: "rgba(34, 24, 56, 0.92)",
              color: "#f5e9c9",
            }
          : {}),
      }}
    >
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={36} className="!mb-0" />
          <span className="font-fraunces text-3xl font-extrabold text-purple-900">NaSCon</span>
        </Link>
        <div className="hidden md:flex items-center gap-10 ml-8">
          <Link
            to="/events"
            className="font-inter font-extrabold text-purple-900 hover:text-amber-500 transition duration-200 pb-1"
          >
            Events
          </Link>
          <Link
            to="/sponsorship/packages"
            className="font-inter font-extrabold text-purple-900 hover:text-amber-500 transition duration-200 pb-1"
          >
            Sponsorships
          </Link>
          <Link
            to="/my-registrations"
            className="font-inter font-extrabold text-purple-900 hover:text-amber-500 transition duration-200 pb-1"
          >
            My Registrations
          </Link>
          <Link
            to="/profile"
            className="font-inter font-extrabold text-purple-900 hover:text-amber-500 transition duration-200 pb-1"
          >
            Profile
          </Link>
          <Link
            to="/gallery"
            className="font-inter font-extrabold text-purple-900 hover:text-amber-500 transition duration-200 pb-1"
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className="font-inter font-extrabold text-purple-900 hover:text-amber-500 transition duration-200 pb-1"
          >
            About
          </Link>
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
