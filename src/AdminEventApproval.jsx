import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function AdminEventApproval() {
  const { theme } = useContext(ThemeContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/events") // Fetch all events
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
    console.log(eventId)
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

  return (
    <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
      <motion.h1
        className="font-fraunces text-4xl font-extrabold mb-8 text-center"
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
          {events.map((event) => (
            <motion.div
              key={event.event_id}
              className="rounded-2xl backdrop-blur-xl p-6 flex flex-col glass-card"
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
                className="mb-2"
              >
                {event.description}
              </div>
              <div
                className="text-sm mb-4"
                style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}
              >
                Category:{" "}
                <span
                  className="font-semibold"
                  style={{
                    color: theme === "dark" ? "#FFC72C" : "#4E2A84",
                  }}
                >
                  {event.category}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleAction(event.event_id, "accept")}
                  className="px-6 py-2 rounded-xl font-bold bg-green-500 text-white shadow-lg hover:scale-105 transition-all"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(event.event_id, "reject")}
                  className="px-6 py-2 rounded-xl font-bold bg-red-500 text-white shadow-lg hover:scale-105 transition-all"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminEventApproval;
