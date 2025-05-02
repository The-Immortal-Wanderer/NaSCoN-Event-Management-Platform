import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
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

  if (loading) return <div className="pt-28 text-lg" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>Loading...</div>;
  if (!event) return <div className="pt-28 text-lg text-red-500">Event not found.</div>;

  return (
    <div className="max-w-3xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link to="/events" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">All Events</Link>
        <Link to="/dashboard" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all">Dashboard</Link>
      </div>
      <h1
        className="font-fraunces text-3xl font-extrabold mb-4"
        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
      >
        {event.name}
      </h1>
      <div className="mb-4" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{event.description}</div>
      <div className="mb-2 text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Category: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>{event.category}</span>
      </div>
      <div className="mb-8 text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
        Max Participants: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>{event.max_participants}</span>
      </div>
      <h2 className="font-fraunces text-xl font-bold mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Rounds</h2>
      <div className="space-y-3">
        {rounds.length === 0 ? (
          <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>No rounds scheduled yet.</div>
        ) : (
          rounds.map(r => (
            <motion.div
              key={r.event_round_id}
              className="rounded-lg px-4 py-3 shadow"
              style={{
                background: "var(--glass-bg)",
                border: "var(--glass-border)",
                boxShadow: "var(--glass-shadow)"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>{r.roundType}</div>
              <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                {r.date_time && new Date(r.date_time).toLocaleString()} at {r.venue_name}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventDetails;
