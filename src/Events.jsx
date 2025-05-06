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

  // Detect if we're in management mode by checking the URL
  const isManageMode = location.pathname.includes("/manage");

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
      })
      .catch(error => {
        toast.error("Failed to load events");
        setLoading(false);
      });
  }, [location.pathname]);

  // Helper function to get status styles
  const getStatusStyles = (status) => {
    let bgColor, textColor, label;
    
    switch(status) {
      case 'accepted':
        bgColor = theme === "dark" ? "bg-green-800" : "bg-green-100";
        textColor = theme === "dark" ? "text-green-100" : "text-green-800";
        label = "Approved";
        break;
      case 'rejected':
        bgColor = theme === "dark" ? "bg-red-800" : "bg-red-100";
        textColor = theme === "dark" ? "text-red-100" : "text-red-800";
        label = "Rejected";
        break;
      default: // pending
        bgColor = theme === "dark" ? "bg-amber-800" : "bg-amber-100";
        textColor = theme === "dark" ? "text-amber-100" : "text-amber-800";
        label = "Pending Approval";
    }
    
    return { bgColor, textColor, label };
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
        {isManageMode ? "Manage Events" : "Browse Events"}
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
      
      {/* Important Information Section - only show in manage mode */}
      {isManageMode && (
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
              Event Management Process
            </h2>
            <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              <strong>Event Status:</strong> Events must be approved by an admin before they become visible to participants. The status indicator shows whether your event is pending approval, active, or requires attention.
            </p>
            <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              <strong>Event Management:</strong> Use this interface to track registrations, manage event rounds, and coordinate with assigned judges. Make sure to set up all rounds and details before your event's registration deadline.
            </p>
          </div>
        </motion.div>
      )}
      
      <div className="w-full max-w-4xl">
        {isManageMode && (
          <motion.div
            className="glass-card rounded-2xl p-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-1 bg-gradient-to-r from-purple-900 to-amber-400 -mx-8 -mt-8 mb-6"></div>
            
            {/* Organizer-specific event management interface */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-fraunces text-2xl font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                My Events
              </h2>
              <Link
                to="/events/create"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-900 to-amber-400 text-white font-bold text-sm hover:opacity-90 transition-all"
              >
                + Create New Event
              </Link>
            </div>
          </motion.div>
        )}

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
                className="rounded-2xl backdrop-blur-xl p-6 flex flex-col glass-card relative"
                whileHover={{ scale: 1.03 }}
              >
                {/* Status badge - only show in manage mode */}
                {isManageMode && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(event.status).bgColor} ${getStatusStyles(event.status).textColor}`}>
                    {getStatusStyles(event.status).label}
                  </div>
                )}

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
                <div className="mt-auto">
                  {isManageMode && event.status === "accepted" ? (
                    <Link
                      to={`/events/${event.event_id}/rounds/manage`}
                      className="inline-block px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-green-600 text-white shadow-lg hover:scale-105 transition-all text-center w-full"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "44px",
                        fontWeight: 700,
                        fontFamily: "Inter, Fraunces, sans-serif"
                      }}
                    >
                      Manage Event
                    </Link>
                  ) : (
                    <Link
                      to={`/event/${event.event_id}`}
                      className="inline-block px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all text-center w-full"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "44px",
                        fontWeight: 700,
                        fontFamily: "Inter, Fraunces, sans-serif"
                      }}
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
