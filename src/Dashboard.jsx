import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "./Logo";

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
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 drop-shadow-glow mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ lineHeight: "1.15", paddingBottom: "0.2em" }}
      >
        Welcome, {displayName}!
      </h1>
      <div className="text-lg text-gray-700 mb-6">
        <span className="font-semibold text-teal-700 capitalize">{user.role}</span> Dashboard
      </div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Link to="/events">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Browse Events
          </motion.button>
        </Link>
        <Link to="/profile">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            My Profile
          </motion.button>
        </Link>
        <Link to="/my-registrations">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            My Registrations
          </motion.button>
        </Link>
        <Link to="/payments">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 to-teal-500 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Payments
          </motion.button>
        </Link>
        <Link to="/sponsorship/packages">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Sponsorship Packages
          </motion.button>
        </Link>
      </div>
      <div className="text-gray-500 text-sm mt-8">
        Explore events, manage your registrations, and payments.
      </div>
    </>
  );
}

function OrganizerDashboard({ user }) {
  const displayName = getDisplayName(user);
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 drop-shadow-glow mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ lineHeight: "1.15", paddingBottom: "0.2em" }}
      >
        Organizer Panel: {displayName}
      </h1>
      <div className="text-lg text-gray-700 mb-6">
        <span className="font-semibold text-teal-700 capitalize">{user.role}</span> Dashboard
      </div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Link to="/events/create">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Create Event
          </motion.button>
        </Link>
        <Link to="/events/manage">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Manage My Events
          </motion.button>
        </Link>
        <Link to="/event-rounds">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Manage Event Rounds
          </motion.button>
        </Link>
        <Link to="/sponsorship/packages">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Sponsorship Packages
          </motion.button>
        </Link>
      </div>
      <div className="text-gray-500 text-sm mt-8">
        Organize, edit, and monitor your events and rounds.
      </div>
    </>
  );
}

function SponsorDashboard({ user }) {
  const displayName = getDisplayName(user);
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 drop-shadow-glow mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ lineHeight: "1.15", paddingBottom: "0.2em" }}
      >
        Sponsor Panel: {displayName}
      </h1>
      <div className="text-lg text-gray-700 mb-6">
        <span className="font-semibold text-teal-700 capitalize">{user.role}</span> Dashboard
      </div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Link to="/sponsorship/packages">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View Sponsorship Packages
          </motion.button>
        </Link>
        <Link to="/sponsorship/manage">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            My Sponsorships
          </motion.button>
        </Link>
        <Link to="/payments">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Sponsorship Payments
          </motion.button>
        </Link>
        <Link to="/sponsorship/packages">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Sponsorship Packages
          </motion.button>
        </Link>
      </div>
      <div className="text-gray-500 text-sm mt-8">
        Sponsor events, manage your sponsorships, and payments.
      </div>
    </>
  );
}

function AdminDashboard({ user }) {
  const displayName = getDisplayName(user);
  return (
    <>
      <h1
        className="text-4xl md:text-5xl font-fraunces font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 drop-shadow-glow mb-2 whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ lineHeight: "1.15", paddingBottom: "0.2em" }}
      >
        Admin Panel: {displayName}
      </h1>
      <div className="text-lg text-gray-700 mb-6">
        <span className="font-semibold text-teal-700 capitalize">{user.role}</span> Dashboard
      </div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Link to="/admin/events">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Approve/Reject Events
          </motion.button>
        </Link>
        <Link to="/admin/venues">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Manage Venues
          </motion.button>
        </Link>
        <Link to="/admin/users">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Manage Users
          </motion.button>
        </Link>
        <Link to="/admin/payments">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 to-teal-500 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Verify Payments
          </motion.button>
        </Link>
        <Link to="/sponsorship/packages">
          <motion.button
            className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Sponsorship Packages
          </motion.button>
        </Link>
      </div>
      <div className="text-gray-500 text-sm mt-8">
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
