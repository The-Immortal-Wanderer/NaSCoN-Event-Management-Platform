import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./App";

function Profile() {
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch {}
  }, []);

  if (!user) return <div className="pt-28 text-lg" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto pt-28 pb-14 px-4">
      <h1
        className="font-fraunces text-3xl font-extrabold mb-8"
        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
      >
        My Profile
      </h1>
      <div className="flex gap-4 mb-6">
        <Link to="/" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">Home</Link>
        <Link to="/dashboard" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all">Dashboard</Link>
      </div>
      <div
        className="rounded-2xl p-8"
        style={{
          background: "var(--glass-bg)",
          border: "var(--glass-border)",
          boxShadow: "var(--glass-shadow)"
        }}
      >
        <div className="mb-4">
          <span className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Name:</span>{" "}
          <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{user.name}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Email:</span>{" "}
          <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{user.email}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Role:</span>{" "}
          <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{user.role}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Contact:</span>{" "}
          <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{user.contact}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
