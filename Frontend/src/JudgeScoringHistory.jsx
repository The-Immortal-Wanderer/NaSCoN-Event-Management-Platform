import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function JudgeScoringHistory() {
  const { theme } = useContext(ThemeContext);
  const [scoringHistory, setScoringHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all", "recent", "events"
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch judge's scoring history
    fetch("http://localhost:3000/judge/scoring-history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch scoring history");
        return res.json();
      })
      .then(data => {
        setScoringHistory(data.history || []);
        
        // Extract unique events for filtering
        const uniqueEvents = Array.from(
          new Set(data.history.map(item => item.event_id))
        ).map(eventId => {
          const eventItem = data.history.find(item => item.event_id === eventId);
          return {
            event_id: eventId,
            event_name: eventItem.event_name
          };
        });
        
        setEvents(uniqueEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching scoring history:", error);
        toast.error("Failed to load scoring history");
        setLoading(false);
      });
  }, []);

  // Filter history data based on selected filter
  const getFilteredHistory = () => {
    if (filter === "all") return scoringHistory;
    
    if (filter === "recent") {
      // Get scores from last 7 days
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return scoringHistory.filter(item => 
        new Date(item.submission_date) >= weekAgo
      );
    }
    
    // Filter by event
    if (filter.startsWith("event-")) {
      const eventId = filter.replace("event-", "");
      return scoringHistory.filter(item => 
        item.event_id.toString() === eventId
      );
    }
    
    return scoringHistory;
  };

  const filteredHistory = getFilteredHistory();

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

  // Format date to human-readable format
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        My Scoring History
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
        {/* Filter Controls */}
        <motion.div
          className="glass-card rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-fraunces text-xl font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
            Filter Scores
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => setFilter('all')} 
              theme={theme}
            >
              All Scores
            </FilterButton>
            
            <FilterButton 
              active={filter === 'recent'} 
              onClick={() => setFilter('recent')} 
              theme={theme}
            >
              Last 7 Days
            </FilterButton>
            
            {events.map(event => (
              <FilterButton
                key={event.event_id}
                active={filter === `event-${event.event_id}`}
                onClick={() => setFilter(`event-${event.event_id}`)}
                theme={theme}
              >
                {event.event_name}
              </FilterButton>
            ))}
          </div>
        </motion.div>

        {/* Scoring History List */}
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
              Loading scoring history...
            </div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <motion.div
            className="glass-card rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-lg mb-3" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
              No Scores Found
            </div>
            <p style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              {filter === 'all' 
                ? "You haven't submitted any scores yet." 
                : "No scores found with the current filter."}
            </p>
            {filter !== 'all' && (
              <motion.button
                className="mt-4 px-4 py-2 rounded-lg font-medium text-sm"
                style={{
                  color: theme === "dark" ? "#FFC72C" : "#4E2A84",
                  border: `1px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`
                }}
                onClick={() => setFilter('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Show All Scores
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-5">
            {filteredHistory.map((score, i) => (
              <motion.div
                key={score.score_id}
                className="glass-card rounded-xl p-6"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-fraunces text-lg font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                        {score.event_name}
                      </h3>
                      <span 
                        className="px-2 py-1 text-xs rounded-full font-medium"
                        style={{ 
                          background: theme === "dark" ? "rgba(255, 199, 44, 0.2)" : "rgba(78, 42, 132, 0.1)",
                          color: theme === "dark" ? "#FFC72C" : "#4E2A84" 
                        }}
                      >
                        {score.round_name}
                      </span>
                    </div>
                    
                    <div className="text-sm mb-1" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                      Team: <span className="font-medium">{score.team_name || `Team ${score.team_id}`}</span>
                    </div>
                    
                    <div className="text-xs opacity-75" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                      Submitted on {formatDate(score.submission_date)}
                    </div>
                    
                    {score.comments && (
                      <div className="mt-3 text-sm italic px-3 py-2 rounded-lg" style={{ 
                        background: theme === "dark" ? "rgba(26, 19, 51, 0.4)" : "rgba(242, 242, 242, 0.6)",
                        color: theme === "dark" ? "#f5e9c9" : "#18122b",
                        borderLeft: `3px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`
                      }}>
                        "{score.comments}"
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-row-reverse md:flex-col items-center md:items-end gap-4">
                    <div 
                      className="px-4 py-2 rounded-full text-lg font-bold"
                      style={{ 
                        background: theme === "dark" ? "#FFC72C" : "#4E2A84",
                        color: theme === "dark" ? "#18122B" : "#FFFFFF"
                      }}
                    >
                      {score.score.toFixed(1)}/10
                    </div>
                    
                    <Link to={`/judge/team/${score.event_id}/${score.team_id}`}>
                      <motion.button
                        className="text-sm font-medium"
                        style={{
                          color: theme === "dark" ? "#FFC72C" : "#4E2A84",
                          textDecoration: "underline"
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Edit Score
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Link back to assigned events */}
        <div className="mt-8 flex justify-center">
          <Link to="/judge/events">
            <motion.button
              className="px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg"
              style={{
                background: theme === "dark" 
                  ? "linear-gradient(to right, #4E2A84, #009688)" 
                  : "linear-gradient(to right, #009688, #4E2A84)"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Back to Assigned Events
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper component for filter buttons
function FilterButton({ active, onClick, theme, children }) {
  return (
    <motion.button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all`}
      style={{
        background: active 
          ? theme === "dark" ? "#FFC72C" : "#4E2A84"
          : "transparent",
        color: active
          ? theme === "dark" ? "#18122B" : "#FFFFFF"
          : theme === "dark" ? "#FFC72C" : "#4E2A84",
        border: active
          ? "none"
          : `1px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

export default JudgeScoringHistory;
