import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./App";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function ManageJudges() {
  const { theme } = useContext(ThemeContext);
  const [judges, setJudges] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedJudge, setSelectedJudge] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const inputStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "var(--glass-border)",
    background: theme === "dark" ? "rgba(26, 19, 51, 0.5)" : "rgba(255, 255, 255, 0.8)",
    color: theme === "dark" ? "#f5e9c9" : "#18122b",
    width: "100%",
    marginBottom: "16px",
    outline: "none"
  };

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/admin/judges", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }).then(res => res.json()),
      fetch("http://localhost:3000/events", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }).then(res => res.json())
    ]).then(([judgeData, eventData]) => {
      setJudges(judgeData.judges || []);
      setEvents(eventData.events || []);
      setLoading(false);
    }).catch(error => {
      toast.error("Failed to load data");
      setLoading(false);
    });
  }, []);

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedJudge || !selectedEvent) {
      toast.error("Please select both a judge and an event");
      return;
    }
    
    setSubmitting(true);
    fetch("http://localhost:3000/admin/assign-judge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ user_id: selectedJudge, event_id: selectedEvent })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          toast.success(data.message);
          setSelectedJudge("");
          setSelectedEvent("");
        } else {
          toast.error(data.error || "Failed to assign judge.");
        }
      })
      .catch(error => {
        toast.error("An error occurred while assigning the judge.");
      })
      .finally(() => {
        setSubmitting(false);
      });
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
        Manage Judges
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
      
      {/* Important Information Section */}
      <motion.div
        className="w-full max-w-3xl glass-card mb-8 rounded-xl overflow-hidden"
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
            Judge Assignment Process
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Assignment Guidelines:</strong> Assign judges based on their expertise and availability. Each event requires at least one judge, but complex competitions may benefit from multiple judges.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Access Control:</strong> Once assigned, judges will only have access to their specific events in the system. They'll be able to view participant details, enter scores, and provide feedback for their assigned events only.
          </p>
        </div>
      </motion.div>
      
      <div className="w-full max-w-3xl">
        {loading ? (
          <div className="glass-card p-8 text-center rounded-2xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
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
              Loading judges and events...
            </div>
          </div>
        ) : (
          <>
            <motion.div
              className="glass-card rounded-2xl p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Assign Judge to Event
              </h2>
              <form onSubmit={handleAssign}>
                <div className="mb-5">
                  <label 
                    className="block mb-2 font-medium"
                    style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                  >
                    Judge
                  </label>
                  <select
                    value={selectedJudge}
                    onChange={e => setSelectedJudge(e.target.value)}
                    style={inputStyle}
                    required
                  >
                    <option value="">Select Judge</option>
                    {judges.map(j => <option key={j.judge_id} value={j.judge_id}>{j.name}</option>)}
                  </select>
                </div>
                <div className="mb-6">
                  <label 
                    className="block mb-2 font-medium"
                    style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                  >
                    Event
                  </label>
                  <select
                    value={selectedEvent}
                    onChange={e => setSelectedEvent(e.target.value)}
                    style={inputStyle}
                    required
                  >
                    <option value="">Select Event</option>
                    {events.map(ev => <option key={ev.event_id} value={ev.event_id}>{ev.name}</option>)}
                  </select>
                </div>
                <motion.button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all w-full"
                  disabled={submitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {submitting ? "Assigning..." : "Assign Judge to Event"}
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div
              className="glass-card rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                All Judges
              </h2>
              
              {judges.length === 0 ? (
                <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                  No judges have been added yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {judges.map(judge => (
                    <motion.div
                      key={judge.judge_id}
                      className="rounded-lg px-4 py-3 shadow-sm"
                      style={{ 
                        background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
                        borderLeft: `3px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                        {judge.name}
                      </div>
                      <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                        {judge.email} • {judge.contact}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default ManageJudges;
