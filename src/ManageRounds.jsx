import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "./App";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ManageRounds() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [rounds, setRounds] = useState([]);
  const [venues, setVenues] = useState([]);
  const [form, setForm] = useState({ roundType: "", date_time: "", venue_id: "" });
  const [loading, setLoading] = useState(true);
  const [dateObj, setDateObj] = useState(null);

  const inputStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "var(--glass-border)",
    background: theme === "dark" ? "rgba(26, 19, 51, 0.5)" : "rgba(255, 255, 255, 0.8)",
    color: theme === "dark" ? "#f5e9c9" : "#18122b",
    width: "100%",
    marginBottom: "16px",
    outline: "none",
    fontSize: "1rem",
    fontFamily: "Inter, Fraunces, sans-serif",
    fontWeight: 500,
    transition: "border-color 0.3s, box-shadow 0.3s"
  };

  const labelStyle = {
    color: theme === "dark" ? "#FFC72C" : "#4E2A84",
    fontFamily: "Fraunces, serif",
    fontWeight: 700,
    fontSize: "1.08rem",
    marginBottom: "0.25rem",
    display: "block"
  };

  useEffect(() => {
    fetch(`http://localhost:3000/event/${eventId}/rounds`)
      .then(res => res.json())
      .then(data => setRounds(data.event_rounds || []));
    fetch("http://localhost:3000/venues")
      .then(res => res.json())
      .then(data => {
        setVenues(data || []);
        setLoading(false);
      });
  }, [eventId]);

  useEffect(() => {
    if (dateObj) {
      setForm(f => ({
        ...f,
        date_time: dateObj.toISOString().slice(0, 16) // "YYYY-MM-DDTHH:mm"
      }));
    }
  }, [dateObj]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddRound = e => {
    e.preventDefault();
    fetch("http://localhost:3000/event-round/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ ...form, event_id: eventId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          toast.success(data.message);
          setRounds([...rounds, { ...form, event_round_id: data.event_round_id }]);
          setForm({ roundType: "", date_time: "", venue_id: "" });
        } else {
          toast.error(data.error || "Failed to add round.");
        }
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
        Manage Event Rounds
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
          className="glass-card rounded-2xl p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleAddRound} className="space-y-5">
            <div>
              <label style={labelStyle}>
                Round Type
              </label>
              <input
                name="roundType"
                value={form.roundType}
                onChange={handleChange}
                style={inputStyle}
                required
                placeholder="e.g. Preliminary, Final"
              />
            </div>
            <div>
              <label style={labelStyle}>
                Date & Time
              </label>
              <DatePicker
                selected={dateObj}
                onChange={date => setDateObj(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date and time"
                className="w-full"
                popperPlacement="bottom"
                style={inputStyle}
                customInput={
                  <input
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      background: theme === "dark" ? "rgba(26, 19, 51, 0.7)" : "rgba(255,255,255,0.95)",
                      border: "var(--glass-border)",
                      fontWeight: 500
                    }}
                    readOnly
                  />
                }
                calendarClassName={theme === "dark" ? "react-datepicker__calendar--dark" : ""}
              />
            </div>
            <div>
              <label style={labelStyle}>
                Venue
              </label>
              <select
                name="venue_id"
                value={form.venue_id}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Select Venue</option>
                {venues.map(v => (
                  <option key={v.venue_id} value={v.venue_id}>{v.name}</option>
                ))}
              </select>
            </div>
            <motion.button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all w-full"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "Fraunces, Inter, sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "0.01em"
              }}
            >
              {loading ? "Adding..." : "Add Round"}
            </motion.button>
          </form>
        </motion.div>
        {loading ? (
          <div className="glass-card p-8 text-center rounded-xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
            {rounds.length === 0
              ? "No rounds yet."
              : "Loading rounds..."}
          </div>
        ) : (
          <motion.div
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold mb-2" style={labelStyle}>Rounds</h2>
            <ul>
              {rounds.map((r, idx) => (
                <li key={r.event_round_id} className="mb-2">
                  <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                    {idx + 1} - {new Date(r.date_time).toLocaleString()} - Venue #{r.venue_id}
                  </span>
                </li>
              ))}
            </ul>
            {rounds.length > 0 && (
              <motion.button
                className="mt-8 px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: "Fraunces, Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "0.01em"
                }}
                onClick={() => navigate("/dashboard")}
              >
                Done
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ManageRounds;
