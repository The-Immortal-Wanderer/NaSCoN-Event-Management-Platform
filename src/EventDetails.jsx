import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="pt-28 text-lg text-gray-500">Loading...</div>;
  if (!event) return <div className="pt-28 text-lg text-red-500">Event not found.</div>;

  return (
    <div className="max-w-3xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link to="/events" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">All Events</Link>
        <Link to="/dashboard" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all">Dashboard</Link>
      </div>
      <h1 className="font-fraunces text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 mb-4">
        {event.name}
      </h1>
      <div className="mb-4 text-gray-700">{event.description}</div>
      <div className="mb-2 text-sm text-gray-500">
        Category: <span className="font-semibold text-purple-900">{event.category}</span>
      </div>
      <div className="mb-8 text-sm text-gray-500">
        Max Participants: <span className="font-semibold">{event.max_participants}</span>
      </div>
      <h2 className="font-fraunces text-xl font-bold text-purple-900 mb-2">Rounds</h2>
      <div className="space-y-3">
        {rounds.length === 0 ? (
          <div className="text-gray-500">No rounds scheduled yet.</div>
        ) : (
          rounds.map(r => (
            <motion.div
              key={r.event_round_id}
              className="rounded-lg bg-white/80 border border-amber-100 px-4 py-3 shadow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="font-bold text-purple-900">{r.roundType}</div>
              <div className="text-sm text-gray-700">
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
