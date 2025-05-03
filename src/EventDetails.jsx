import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(`http://localhost:3000/events`)
      .then(res => res.json())
      .then(data => {
        const found = (data.events || []).find(e => String(e.event_id) === String(eventId));
        setEvent(found);
      });
    fetch(`http://localhost:3000/event/${eventId}/rounds`)
      .then(res => res.json())
      .then(data => {
        setRounds(data.event_rounds || []);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return (
    <div className="pt-28 pb-6 px-4 max-w-5xl mx-auto">
      <div className="glass-card p-8 text-center rounded-xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        {event === null && rounds.length === 0
          ? "No event details yet."
          : "Loading..."}
      </div>
    </div>
  );
  
  if (!event) return (
    <div className="pt-28 pb-6 px-4 max-w-5xl mx-auto">
      <div className="glass-card p-8 text-center rounded-xl text-red-500">
        Event not found.
      </div>
    </div>
  );

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
        Event Details
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
      
      <div className="w-full max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 mb-6"
        >
          <h1
            className="font-fraunces text-3xl font-extrabold mb-4"
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          >
            {event.name}
          </h1>
          <div className="mb-4" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            {event.description}
          </div>
          <div className="mb-2 text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
            Category: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
              {event.category}
            </span>
          </div>
          <div className="mb-4 text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
            Max Participants: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
              {event.max_participants}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8"
        >
          <h2 className="font-fraunces text-xl font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
            Rounds
          </h2>
          
          <div className="space-y-3">
            {rounds.length === 0 ? (
              <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                No rounds scheduled yet.
              </div>
            ) : (
              rounds.map(r => (
                <motion.div
                  key={r.event_round_id}
                  className="rounded-lg px-4 py-3 shadow-sm"
                  style={{ 
                    background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
                    borderLeft: `3px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                    {r.roundType}
                  </div>
                  <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                    {r.date_time && new Date(r.date_time).toLocaleString()} at {r.venue_name}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EventDetails;
