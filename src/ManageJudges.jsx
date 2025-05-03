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
      fetch("http://localhost:3000/judges", {
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
    fetch("http://localhost:3000/judge/assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ judge_id: selectedJudge, event_id: selectedEvent })
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
