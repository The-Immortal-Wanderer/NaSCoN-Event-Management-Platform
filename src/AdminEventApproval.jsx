import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function AdminEventApproval() {
  const { theme } = useContext(ThemeContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => {
        const pendingEvents = data.events.filter((event) => event.status === "pending");
        setEvents(pendingEvents);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch events.");
        setLoading(false);
      });
  }, []);

  const handleAction = (eventId, action) => {
    const url = action === "accept" 
      ? `http://localhost:3000/event/accept/${eventId}` 
      : `http://localhost:3000/event/${eventId}/reject`;

    fetch(url, {
      method: action === "accept" ? "POST" : "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setEvents(events.filter((event) => event.event_id !== eventId));
        } else {
          toast.error(data.error || "Action failed.");
        }
      })
      .catch(() => toast.error("Failed to perform action."));
  };

  // Card transition variants
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
        Event Approval
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
            Event Approval Guidelines
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Review Process:</strong> Review event details for completeness and appropriateness. Events must have clear descriptions, reasonable registration fees, and proper categorization before approval.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Approval Impact:</strong> After approval, events become visible to participants and can accept registrations. Organizers will be notified and can then set up rounds, venues, and judges for their event.
          </p>
        </div>
      </motion.div>
      
      {loading ? (
        <div
          className="text-lg glass-card p-8 text-center rounded-xl"
          style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}
        >
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <div
          className="text-lg glass-card p-8 text-center rounded-xl"
          style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}
        >
          No pending events to approve.
        </div>
      ) : (
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.event_id}
              className="rounded-2xl backdrop-blur-xl p-6 flex flex-col glass-card"
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
                style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
                className="mb-2 flex-grow"
              >
                {event.description}
              </div>
              <div
                className="text-sm mb-4"
                style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}
              >
                Category: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>{event.category}</span>
              </div>
              
              <div className="flex gap-4 mt-auto">
                <motion.button
                  onClick={() => handleAction(event.event_id, "accept")}
                  className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg flex-1 text-center"
                  style={{
                    background: `linear-gradient(to right, #2E7D32, #4E2A84)`,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Accept
                </motion.button>
                <motion.button
                  onClick={() => handleAction(event.event_id, "reject")}
                  className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg flex-1 text-center"
                  style={{
                    background: `linear-gradient(to right, #C62828, #4E2A84)`,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Reject
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminEventApproval;
