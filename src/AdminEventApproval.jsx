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
          letterSpacing: "0.01em",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        Pending Event Approvals
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
