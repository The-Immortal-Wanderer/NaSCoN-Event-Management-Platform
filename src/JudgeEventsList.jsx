import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function JudgeEventsList() {
  const { theme } = useContext(ThemeContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/admin/judges/events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
        toast.error("Failed to load assigned events");
        setLoading(false);
      });
  }, []);

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        bounce: 0.2
      }
    })
  };

  return (
    <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
      <motion.h1
        className="font-fraunces text-4xl font-extrabold mb-4 text-center"
        style={{
          color: theme === "dark" ? "#FFC72C" : "#4E2A84",
          letterSpacing: "0.01em"
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        My Assigned Events
      </motion.h1>

      <motion.div
        className="w-20 h-1 mb-12"
        style={{
          background: theme === "dark" ? "#FFC72C" : "#4E2A84",
          borderRadius: "1px"
        }}
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      
      {/* Important Information Section */}
      <motion.div
        className="w-full max-w-4xl glass-card mb-8 rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="p-1 bg-gradient-to-r from-purple-900 to-amber-400">
          {/* Gradient strip at top */}
        </div>
        <div className="p-6">
          <h2 
            className="font-fraunces text-xl font-bold mb-3 flex items-center" 
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Judge Information
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Judge Responsibilities:</strong> As a judge, you'll evaluate participants in your assigned events, providing fair and consistent scoring based on the event criteria.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Scoring Process:</strong> For each event, you'll be able to view participating teams/individuals and submit scores for their performances. All scores should include both numerical ratings and constructive comments.
          </p>
        </div>
      </motion.div>

      <div className="w-full max-w-4xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full mb-4"
              style={{ 
                borderColor: theme === "dark" ? "rgba(255, 199, 44, 0.3)" : "rgba(78, 42, 132, 0.3)",
                borderTopColor: "transparent" 
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              />
            </div>
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              Loading assigned events...
            </div>
          </div>
        ) : events.length === 0 ? (
          <motion.div
            className="glass-card rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-lg mb-3" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
              No Assigned Events
            </div>
            <p style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              You haven't been assigned to any events yet. Please check back later or contact the administrators.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.event_id}
                className="glass-card rounded-2xl p-6"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
              >
                <h2
                  className="font-fraunces text-2xl font-bold mb-2"
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  {event.name}
                </h2>
                <div 
                  className="text-sm mb-2" 
                  style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}
                >
                  Category: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>{event.category}</span>
                </div>
                <div
                  className="mb-4 line-clamp-3"
                  style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
                >
                  {event.description}
                </div>
                <Link
                  to={`/judge/event/${event.event_id}`}
                  className="inline-block w-full"
                >
                  <motion.button
                    className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg w-full"
                    style={{
                      background: theme === "dark" 
                        ? "linear-gradient(to right, #FFC72C, #4E2A84)"
                        : "linear-gradient(to right, #4E2A84, #009688)"
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Judge Event
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JudgeEventsList;
