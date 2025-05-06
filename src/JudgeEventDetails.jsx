import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function JudgeEventDetails() {
  const { eventId } = useParams();
  const { theme } = useContext(ThemeContext);
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch event details
    fetch(`http://localhost:3000/events`)
      .then(res => res.json())
      .then(data => {
        const foundEvent = (data.events || []).find(e => String(e.event_id) === String(eventId));
        setEvent(foundEvent);
      });

    // Fetch participants for this event
    fetch(`http://localhost:3000/participants/event/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => {
        setParticipants(data.participants || []);
      })
      .catch(error => {
        toast.error("Failed to load participants");
      });

    // Fetch rounds for this event
    fetch(`http://localhost:3000/event/${eventId}/rounds`)
      .then(res => res.json())
      .then(data => {
        setRounds(data.event_rounds || []);
        setLoading(false);
      })
      .catch(error => {
        toast.error("Failed to load event rounds");
        setLoading(false);
      });
  }, [eventId]);

  // Group participants by team_id
  const teams = {};
  participants.forEach(p => {
    if (!teams[p.team_id]) {
      teams[p.team_id] = [];
    }
    teams[p.team_id].push(p);
  });

  // Card animation variants
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

  if (loading) {
    return (
      <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
        <div className="glass-card p-8 text-center rounded-xl w-full max-w-4xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
          Loading event details...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
        <div className="glass-card p-8 text-center rounded-xl w-full max-w-4xl text-red-500">
          Event not found.
        </div>
      </div>
    );
  }

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
        Judge: {event.name}
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
      
      <div className="w-full max-w-4xl">
        <motion.div
          className="glass-card rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-fraunces text-xl font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
            Event Details
          </h2>
          <div className="mb-4" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            {event.description}
          </div>
          <div className="mb-2 text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
            Category: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
              {event.category}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-fraunces text-xl font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
            Event Rounds
          </h2>
          
          {rounds.length === 0 ? (
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              No rounds have been scheduled for this event yet.
            </div>
          ) : (
            <div className="space-y-3">
              {rounds.map((round, i) => (
                <motion.div
                  key={round.event_round_id}
                  className="rounded-lg px-4 py-3 shadow-sm"
                  style={{ 
                    background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
                    borderLeft: `3px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`
                  }}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <div className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                    {round.roundType}
                  </div>
                  <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                    {new Date(round.date_time).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-fraunces text-xl font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
            Teams to Evaluate
          </h2>
          
          {Object.keys(teams).length === 0 ? (
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              No teams have registered for this event yet.
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(teams).map(([teamId, teamMembers], i) => (
                <motion.div
                  key={teamId}
                  className="glass-card rounded-lg px-5 py-4 shadow-sm"
                  style={{ 
                    background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)" 
                  }}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold text-lg" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                        Team {teamId}
                      </div>
                      <div className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                        {teamMembers.length} participant{teamMembers.length > 1 ? "s" : ""}
                      </div>
                      <div className="space-y-1">
                        {teamMembers.map(member => (
                          <div key={member.participant_id} className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                            • {member.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link to={`/judge/team/${eventId}/${teamId}`}>
                      <motion.button
                        className="px-4 py-2 rounded-lg font-bold text-sm text-white shadow-lg"
                        style={{
                          background: theme === "dark" 
                            ? "linear-gradient(to right, #FFC72C, #4E2A84)" 
                            : "linear-gradient(to right, #4E2A84, #009688)"
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Score Team
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        
        <motion.div className="mt-6 flex justify-end">
          <Link to={`/judge/event/${eventId}/results`}>
            <motion.button
              className="px-4 py-2 rounded-lg font-bold text-sm text-white shadow-lg"
              style={{
                background: theme === "dark" 
                  ? "linear-gradient(to right, #4E2A84, #009688)" 
                  : "linear-gradient(to right, #009688, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              View Results
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default JudgeEventDetails;
