import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link to="/" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">Home</Link>
        <Link to="/dashboard" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all">Dashboard</Link>
      </div>
      <h1
        className="font-fraunces text-4xl font-extrabold mb-8"
        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
      >
        All Events
      </h1>
      {loading ? (
        <div className="text-lg" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>Loading events...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {events.map(event => (
            <motion.div
              key={event.event_id}
              className="rounded-2xl backdrop-blur-xl shadow-lg p-6 flex flex-col"
              style={{
                background: "var(--glass-bg)",
                border: "var(--glass-border)",
                boxShadow: "var(--glass-shadow)"
              }}
              whileHover={{ scale: 1.03 }}
            >
              <h2
                className="font-fraunces text-2xl font-bold mb-2"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                {event.name}
              </h2>
              <div style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }} className="mb-2">{event.description}</div>
              <div className="text-sm mb-4" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                Category: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>{event.category}</span>
              </div>
              <Link
                to={`/event/${event.event_id}`}
                className="inline-block px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
