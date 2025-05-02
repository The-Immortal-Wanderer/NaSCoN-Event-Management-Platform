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

function StudentDashboard({ user }) {
  const displayName = getDisplayName(user);
  const { theme } = useContext(ThemeContext);
  // Button style for consistent width and centering
  const btnStyle = {
    minWidth: 180,
    justifyContent: "center",
    display: "flex"
  };
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          lineHeight: "1.15",
          paddingBottom: "0.2em",
          color: theme === "dark" ? "#FFC72C" : "#4E2A84"
        }}
      >
        Welcome, {displayName}!
      </h1>
      <div
        className="text-lg mb-6"
        style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
      >
        <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#009688" }}>{user.role}</span> Dashboard
      </div>
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row 1: Events & Registrations */}
        <div className="flex gap-4 justify-center w-full">
          <Link to="/events" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Browse Events
            </motion.button>
          </Link>
          <Link to="/my-registrations" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              My Registrations
            </motion.button>
          </Link>
        </div>
        {/* Row 2: Profile & Payments */}
        <div className="flex gap-4 justify-center w-full">
          <Link to="/profile" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              My Profile
            </motion.button>
          </Link>
          <Link to="/payments" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-amber-400 to-teal-500 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Payments
            </motion.button>
          </Link>
        </div>
        {/* Row 3: Sponsorships (rainbowish, centered) */}
        <div className="flex justify-center w-full">
          <Link to="/sponsorship/packages" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-purple-900 via-amber-400 via-teal-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Sponsorship Packages
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="text-sm mt-8" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Explore events, manage your registrations, and payments.
      </div>
    </>
  );
}

function OrganizerDashboard({ user }) {
  const displayName = getDisplayName(user);
  const { theme } = useContext(ThemeContext);
  const btnStyle = {
    minWidth: 180,
    justifyContent: "center",
    display: "flex"
  };
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          lineHeight: "1.15",
          paddingBottom: "0.2em",
          color: theme === "dark" ? "#FFC72C" : "#4E2A84"
        }}
      >
        Organizer Panel: {displayName}
      </h1>
      <div
        className="text-lg mb-6"
        style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
      >
        <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#009688" }}>{user.role}</span> Dashboard
      </div>
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row 1: Event Management */}
        <div className="flex gap-4 justify-center w-full">
          <Link to="/events/create" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Create Event
            </motion.button>
          </Link>
          <Link to="/events/manage" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Manage My Events
            </motion.button>
          </Link>
        </div>
        {/* Row 2: Rounds & Sponsorships */}
        <div className="flex gap-4 justify-center w-full">
          <Link to="/event-rounds" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Manage Event Rounds
            </motion.button>
          </Link>
          <Link to="/sponsorship/packages" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-amber-400 to-teal-500 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Sponsorship Packages
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="text-sm mt-8" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Organize, edit, and monitor your events and rounds.
      </div>
    </>
  );
}

function SponsorDashboard({ user }) {
  const displayName = getDisplayName(user);
  const { theme } = useContext(ThemeContext);
  const btnStyle = {
    minWidth: 180,
    justifyContent: "center",
    display: "flex"
  };
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          lineHeight: "1.15",
          paddingBottom: "0.2em",
          color: theme === "dark" ? "#FFC72C" : "#4E2A84"
        }}
      >
        Sponsor Panel: {displayName}
      </h1>
      <div
        className="text-lg mb-6"
        style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
      >
        <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#009688" }}>{user.role}</span> Dashboard
      </div>
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row 1: Sponsorships (side by side) */}
        <div className="flex gap-4 justify-center w-full">
          <Link to="/sponsorship/packages" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              View Packages
            </motion.button>
          </Link>
          <Link to="/sponsorship/manage" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              My Sponsorships
            </motion.button>
          </Link>
        </div>
        {/* Row 2: Payments (centered below, inward gradient) */}
        <div className="flex justify-center w-full">
          <Link to="/payments" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-l from-purple-900 via-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Sponsorship Payments
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="text-sm mt-8" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Sponsor events, manage your sponsorships, and payments.
      </div>
    </>
  );
}

function AdminDashboard({ user }) {
  const displayName = getDisplayName(user);
  const { theme } = useContext(ThemeContext);
  const btnStyle = {
    minWidth: 180,
    justifyContent: "center",
    display: "flex"
  };
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{
          lineHeight: "1.15",
          paddingBottom: "0.2em",
          color: theme === "dark" ? "#FFC72C" : "#4E2A84"
        }}
      >
        Admin Panel: {displayName}
      </h1>
      <div
        className="text-lg mb-6"
        style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
      >
        <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#009688" }}>{user.role}</span> Dashboard
      </div>
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row 1: Events & Venues */}
        <div className="flex gap-4 justify-center w-full">
          <Link to="/admin/events" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Approve/Reject Events
            </motion.button>
          </Link>
          <Link to="/admin/venues" className="flex-1 flex justify-center" style={btnStyle}>
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
          <Link to="/admin/users" className="flex-1 flex justify-center" style={btnStyle}>
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              style={btnStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Manage Users
            </motion.button>
          </Link>
          <Link to="/admin/payments" className="flex-1 flex justify-center" style={btnStyle}>
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
        {/* Row 3: Sponsorships */}
        <div className="flex justify-center w-full">
          <Link to="/sponsorship/packages" className="flex-1 flex justify-center" style={btnStyle}>
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
      <div className="text-sm mt-8" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Administer events, venues, users, and payments.
      </div>
    </>
  );
}

function Dashboard() {
  const user = getUser();

  let content;
  switch (user.role) {
    case "organizer":
      content = <OrganizerDashboard user={user} />;
      break;
    case "sponsor":
      content = <SponsorDashboard user={user} />;
      break;
    case "admin":
      content = <AdminDashboard user={user} />;
      break;
    default:
      content = <StudentDashboard user={user} />;
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-inter"
    >
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
