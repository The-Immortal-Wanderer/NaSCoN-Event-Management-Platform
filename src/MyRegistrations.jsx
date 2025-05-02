import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./App";

function MyRegistrations() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="max-w-4xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link to="/" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">Home</Link>
        <Link to="/events" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all">Events</Link>
      </div>
      <h1
        className="font-fraunces text-4xl font-extrabold mb-8"
        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
      >
        My Registrations
      </h1>
      <div
        className="rounded-2xl p-8"
        style={{
          background: "var(--glass-bg)",
          border: "var(--glass-border)",
          boxShadow: "var(--glass-shadow)"
        }}
      >
        {/* Map over registrations here */}
        <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>Your event registrations will appear here.</div>
      </div>
    </div>
  );
}

export default MyRegistrations;
