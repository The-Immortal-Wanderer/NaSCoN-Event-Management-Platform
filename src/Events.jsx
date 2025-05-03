import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch {}
  }, []);

  useEffect(() => {
    let url = "http://localhost:3000/events";
    // If on /events/manage, fetch only organizer's events
    if (location.pathname === "/events/manage") {
      url = "http://localhost:3000/organizer-events";
    }
    fetch(url, {
      headers: location.pathname === "/events/manage"
        ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
        : undefined
    })
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || data || []);
        setLoading(false);
      });
  }, [location.pathname]);

  return (
    <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
      <motion.h1
        className="font-fraunces text-4xl font-extrabold mb-8 text-center"
        style={{
          color: theme === "dark" ? "#FFC72C" : "#4E2A84",
          letterSpacing: "0.01em"
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        All Events
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
      
      <div className="w-full max-w-5xl">
        {loading ? (
          <div 
            className="text-lg glass-card p-8 text-center rounded-xl"
            style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}
          >
            {events.length === 0
              ? "No events yet."
              : "Loading events..."}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {events.map(event => (
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
                  Category: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>{event.category}</span>
                </div>
                <Link
                  to={`/event/${event.event_id}`}
                  className="inline-block px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all text-center w-full"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "44px", // ensures vertical centering
                    fontWeight: 700,
                    fontFamily: "Inter, Fraunces, sans-serif"
                  }}
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
