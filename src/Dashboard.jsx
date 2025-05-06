import React, { useContext, useState, useEffect } from "react";
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
  const [registrationCount, setRegistrationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Fetch registration count when dashboard loads
  useEffect(() => {
    fetch("http://localhost:3000/my-registrations", {
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}` 
      }
    })
      .then(res => res.json())
      .then(data => {
        setRegistrationCount(data.registrations?.length || 0);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching registrations:", error);
        setLoading(false);
      });
  }, []);
  
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
        <span 
          className="font-semibold" 
          style={{ 
            color: theme === "dark" ? "#FFC72C" : "#4E2A84",
            textTransform: "capitalize" 
          }}
        >
          {user.role}
        </span> Dashboard
      </div>
      
      {/* Registration Stats */}
      <div className="w-full mb-6">
        <motion.div 
          className="glass-card p-4 rounded-xl flex justify-around items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center px-4">
            <div className="text-3xl font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
              {loading ? "..." : registrationCount}
            </div>
            <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Registered Events</div>
          </div>
        </motion.div>
      </div>
      
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row 1: Events, Registrations */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/events" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84, #FFC72C)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Browse Events
            </motion.button>
          </Link>
          <Link to="/my-registrations" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #FFC72C, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              My Registrations
            </motion.button>
          </Link>
        </div>
        
        {/* Row 2: Registration, Payment */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/event/register" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84, #FFC72C)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Register for Event
            </motion.button>
          </Link>
          <Link to="/event/payment" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #FFC72C, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Event Payment
            </motion.button>
          </Link>
        </div>
        
        {/* Row 3: Accommodation */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/accommodation" className="flex-1 flex justify-center min-w-[150px] max-w-xs mx-auto">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84 0%, #FFC72C 50%, #4E2A84 100%)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              My Accommodation
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="text-sm mt-8" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Explore events, manage your registrations, accommodation and payments.
      </div>
    </>
  );
}

function OrganizerDashboard({ user }) {
  const displayName = getDisplayName(user);
  const { theme } = useContext(ThemeContext);
  
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
        <span 
          className="font-semibold" 
          style={{ 
            color: theme === "dark" ? "#FFC72C" : "#4E2A84",
            textTransform: "capitalize" 
          }}
        >
          {user.role}
        </span> Dashboard
      </div>
      
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row: Create Event, My Events */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/events/create" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84, #FFC72C)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Create Event
            </motion.button>
          </Link>
          <Link to="/events" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #FFC72C, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              My Events
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="text-sm mt-8" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Organize, edit, and monitor your events.
      </div>
    </>
  );
}

function SponsorDashboard({ user }) {
  const displayName = getDisplayName(user);
  const { theme } = useContext(ThemeContext);
  
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
        <span 
          className="font-semibold" 
          style={{ 
            color: theme === "dark" ? "#FFC72C" : "#4E2A84",
            textTransform: "capitalize" 
          }}
        >
          {user.role}
        </span> Dashboard
      </div>
      
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row: View Packages, My Sponsorships */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/sponsorship/packages" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84, #FFC72C)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              View Packages
            </motion.button>
          </Link>
          <Link to="/sponsorship/manage" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #FFC72C, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              My Sponsorships
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
        <span 
          className="font-semibold" 
          style={{ 
            color: theme === "dark" ? "#FFC72C" : "#4E2A84",
            textTransform: "capitalize" 
          }}
        >
          {user.role}
        </span> Dashboard
      </div>
      
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row 1: Events, Venues */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/admin/events" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84, #FFC72C)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Manage Events
            </motion.button>
          </Link>
          <Link to="/admin/venues" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #FFC72C, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Manage Venues
            </motion.button>
          </Link>
        </div>
        
        {/* Row 2: Add Judge, Manage Judges */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/admin/judges/add" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84, #FFC72C)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Add Judge
            </motion.button>
          </Link>
          <Link to="/admin/judges" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #FFC72C, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Manage Judges
            </motion.button>
          </Link>
        </div>
        
        {/* Row 3: Verify Payments */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/admin/payments" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84 0%, #FFC72C 50%, #4E2A84 100%)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Verify Payments
            </motion.button>
          </Link>
        </div>
        
        {/* Row 4: Accommodation Details, Sponsor Packages */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/admin/accommodation" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84, #FFC72C)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Accommodation Details
            </motion.button>
          </Link>
          <Link to="/admin/sponsorship/packages" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full max-w-xs text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #FFC72C, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Sponsor Packages
            </motion.button>
          </Link>
        </div>
        
        {/* Row 5: Payment Approval (Single Button) */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/admin/payment-approval" className="flex-1 flex justify-center min-w-[150px] max-w-xs mx-auto">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base w-full text-white shadow-lg hover:scale-105 transition-all"
              style={{
                background: "linear-gradient(to right, #4E2A84 0%, #FFC72C 50%, #4E2A84 100%)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Payment Approval
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="text-sm mt-8" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Administer events, venues, judges, payments, and accommodations.
      </div>
    </>
  );
}

function JudgeDashboard({ user }) {
  const displayName = getDisplayName(user);
  const { theme } = useContext(ThemeContext);
  const [events, setEvents] = useState([]);
  const [scoreCount, setScoreCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch assigned events
    fetch("http://localhost:3000/admin/judges/events", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
      })
      .catch(err => {
        console.error("Error fetching judge events:", err);
      });
    
    // Fetch score count
    fetch("http://localhost:3000/judge/score-count", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => {
        setScoreCount(data.count || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching score count:", err);
        setLoading(false);
      });
  }, []);

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
        Judge Panel: {displayName}
      </h1>
      <div
        className="text-lg mb-6"
        style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
      >
        <span 
          className="font-semibold" 
          style={{ 
            color: theme === "dark" ? "#FFC72C" : "#4E2A84",
            textTransform: "capitalize" 
          }}
        >
          {user.role}
        </span> Dashboard
      </div>
      
      {/* Stats Cards */}
      <div className="w-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                style={{ 
                  background: theme === "dark" ? "rgba(255, 199, 44, 0.2)" : "rgba(78, 42, 132, 0.1)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <div className="text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                  Assigned Events
                </div>
                <div className="text-3xl font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                  {loading ? "..." : events.length}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                style={{ 
                  background: theme === "dark" ? "rgba(255, 199, 44, 0.2)" : "rgba(78, 42, 132, 0.1)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <div className="text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                  Scores Submitted
                </div>
                <div className="text-3xl font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                  {loading ? "..." : scoreCount}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4 justify-center mb-8 w-full">
        {/* Row: Judge Events, Scoring History */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          <Link to="/judge/events" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg w-full"
              style={{
                background: "linear-gradient(to right, #4E2A84, #FFC72C)"
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Assigned Events
            </motion.button>
          </Link>
          <Link to="/judge/scoring-history" className="flex-1 flex justify-center min-w-[150px]">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-base shadow-lg w-full text-white"
              style={{
                background: "linear-gradient(to right, #FFC72C, #4E2A84)"
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Scoring History
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="text-sm mt-8" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Review assigned events, submit scores, and view results.
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
    case "judge":
      content = <JudgeDashboard user={user} />;
      break;
    default:
      content = <StudentDashboard user={user} />;
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-inter"
    >
      <div className="absolute top-14 left-0 w-full flex justify-center pt-10">
        <Logo size={64} />
      </div>
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto text-center py-20 px-4 mt-16"
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
