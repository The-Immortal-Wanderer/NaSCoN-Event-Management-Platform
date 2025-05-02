import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="font-fraunces text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 mb-8">
        All Events
      </h1>
      {loading ? (
        <div className="text-lg text-gray-500">Loading events...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {events.map(event => (
            <motion.div
              key={event.event_id}
              className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg border border-amber-100 p-6 flex flex-col"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="font-fraunces text-2xl font-bold text-purple-900 mb-2">{event.name}</h2>
              <div className="text-gray-700 mb-2">{event.description}</div>
              <div className="text-sm text-gray-500 mb-4">
                Category: <span className="font-semibold text-purple-900">{event.category}</span>
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
