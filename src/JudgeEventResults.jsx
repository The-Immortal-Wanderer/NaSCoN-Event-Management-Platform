import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function JudgeEventResults() {
  const { eventId } = useParams();
  const { theme } = useContext(ThemeContext);
  const [event, setEvent] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch event details
    fetch(`http://localhost:3000/events`)
      .then(res => res.json())
      .then(data => {
        const foundEvent = (data.events || []).find(e => String(e.event_id) === String(eventId));
        setEvent(foundEvent);
      });

    // Fetch results
    fetch(`http://localhost:3000/judge/event/${eventId}/results`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch results");
        }
        return res.json();
      })
      .then(data => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching results:", error);
        toast.error("Failed to load results");
        setLoading(false);
      });
  }, [eventId]);

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
        Event Results
      </motion.h1>

      <motion.div
        className="w-20 h-1 mb-8"
        style={{
          background: theme === "dark" ? "#FFC72C" : "#4E2A84",
          borderRadius: "1px"
        }}
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center h-40">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full mb-4"
            style={{ 
              borderColor: theme === "dark" ? "rgba(255, 199, 44, 0.3)" : "rgba(78, 42, 132, 0.3)",
              borderTopColor: "transparent" 
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
            />
          </div>
          <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
            Loading event results...
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          {event && (
            <motion.div
              className="glass-card rounded-2xl p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="font-fraunces text-2xl font-bold mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                {event.name}
              </h2>
              <div className="text-sm mb-4" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                Category: <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>{event.category}</span>
              </div>
            </motion.div>
          )}

          {results.length === 0 ? (
            <motion.div
              className="glass-card rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-lg mb-3" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                No Results Available
              </div>
              <p style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                Results will be available after all rounds have been scored. Please check back later.
              </p>
            </motion.div>
          ) : (
            <div>
              <motion.h2
                className="font-fraunces text-xl font-bold mb-6"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Final Standings
              </motion.h2>
              
              <div className="space-y-4">
                {results.map((result, i) => (
                  <motion.div
                    key={result.team_id}
                    className="glass-card rounded-lg p-4 flex items-center"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold text-xl"
                      style={{
                        background: i === 0 
                          ? "linear-gradient(to bottom right, #FFD700, #FFC72C)" // Gold for 1st
                          : i === 1 
                            ? "linear-gradient(to bottom right, #C0C0C0, #E0E0E0)" // Silver for 2nd
                            : i === 2 
                              ? "linear-gradient(to bottom right, #CD7F32, #B87333)" // Bronze for 3rd
                              : theme === "dark" ? "rgba(26, 19, 51, 0.7)" : "rgba(242, 242, 242, 0.7)",
                        color: i <= 2 ? "#18122b" : (theme === "dark" ? "#FFC72C" : "#4E2A84")
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                        Team {result.team_id}
                      </div>
                      <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                        {result.team_name || `Team ${result.team_id}`}
                      </div>
                    </div>
                    <div className="font-bold text-xl" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                      {result.total_score.toFixed(1)}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link to={`/judge/events`}>
                  <motion.button
                    className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg"
                    style={{
                      background: theme === "dark" 
                        ? "linear-gradient(to right, #FFC72C, #4E2A84)" 
                        : "linear-gradient(to right, #4E2A84, #009688)"
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Back to My Events
                  </motion.button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JudgeEventResults;
