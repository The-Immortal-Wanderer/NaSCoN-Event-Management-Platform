import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { ThemeContext } from "./App";

function getUser() {
  // Always get user info from localStorage, which is set at login time
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    // Only return if both name and role are present
    if (user && typeof user.name === "string" && typeof user.role === "string") {
      return user;
    }
  } catch {}
  // If not logged in or info missing, redirect to login or show fallback
  return { name: "User", role: "student" };
}

function getDisplayName(user) {
  // If the name looks like an email, show only the part before '@'
  if (user && typeof user.name === "string" && user.name.includes("@")) {
    return user.name.split("@")[0];
  }
  return user && user.name ? user.name : "User";
}

function AdminDashboard({ user }) {
  const displayName = getDisplayName(user);
  const { theme } = useContext(ThemeContext);
  const btnStyle = {
    minWidth: 180,
    justifyContent: "center",
    display: "flex",
  };

  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          lineHeight: "1.15",
          paddingBottom: "0.2em",
          color: theme === "dark" ? "#FFC72C" : "#4E2A84",
        }}
      >
        Admin Panel: {displayName}
      </h1>
      <div
        className="text-lg mb-6"
        style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
      >
        <span
          className="font-semibold"
          style={{ color: theme === "dark" ? "#FFC72C" : "#009688" }}
        >
          {user.role}
        </span>{" "}
        Dashboard
      </div>
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row 1: Events & Venues */}
        <div className="flex gap-4 justify-center w-full">
          <Link
            to="/admin/events"
            className="flex-1 flex justify-center"
            style={btnStyle}
          >
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Approve/Reject Events
            </motion.button>
          </Link>
          <Link
            to="/admin/venues"
            className="flex-1 flex justify-center"
            style={btnStyle}
          >
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Manage Venues
            </motion.button>
          </Link>
        </div>
        {/* Row 2: Users & Payments */}
        <div className="flex gap-4 justify-center w-full">
          <Link
            to="/admin/users"
            className="flex-1 flex justify-center"
            style={btnStyle}
          >
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Manage Users
            </motion.button>
          </Link>
          <Link
            to="/admin/payments"
            className="flex-1 flex justify-center"
            style={btnStyle}
          >
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-amber-400 to-teal-500 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Verify Payments
            </motion.button>
          </Link>
        </div>
        {/* Row 3: Sponsorship Packages */}
        <div className="flex justify-center w-full">
          <Link
            to="/admin/sponsorship/packages"
            className="flex-1 flex justify-center"
            style={btnStyle}
          >
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-purple-900 via-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Sponsorship Packages
            </motion.button>
          </Link>
        </div>
      </div>
      <div
        className="text-sm mt-8"
        style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}
      >
        Administer events, venues, users, and payments.
      </div>
    </>
  );
}

function Dashboard() {
  const user = getUser();

  let content;
  switch (user.role) {
    case "admin":
      content = <AdminDashboard user={user} />;
      break;
    default:
      content = <div>Unauthorized Access</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-inter">
      <div className="flex justify-center mt-8 mb-2">
        <Logo size={64} />
      </div>
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto text-center py-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1, bounce: 0.18 }}
      >
        {content}
      </motion.div>
    </div>
  );
}

export default Dashboard;