import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function AddVenue() {
  const [form, setForm] = useState({ name: "", location: "", type: "", capacity: "" });
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    fetch("http://localhost:3000/addVenue", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        if (data.venue_id) {
          toast.success("Venue added successfully!");
          setForm({ name: "", location: "", type: "", capacity: "" });
        } else {
          toast.error(data.error || "Failed to add venue.");
        }
      })
      .catch(err => {
        toast.error("An error occurred while adding the venue.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
        Add Venue
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
        className="w-full max-w-xl glass-card mb-8 rounded-xl overflow-hidden"
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
            Venue Management Information
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Venue Setup:</strong> All venues added here will become available for event organizers to select when scheduling their event rounds. Accurate capacity information is crucial for planning.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Availability:</strong> Once added, venues can be booked by organizers for specific time slots. The system will prevent double-booking of venues for overlapping time periods.
          </p>
        </div>
      </motion.div>
      
      <div className="w-full max-w-xl">
        <motion.div
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-1 bg-gradient-to-r from-purple-900 to-amber-400 -mx-8 -mt-8 mb-6"></div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label 
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Venue Name
              </label>
              <input 
                name="name" 
                placeholder="Enter venue name" 
                value={form.name} 
                onChange={handleChange} 
                style={inputStyle} 
                required 
              />
            </div>

            <div className="mb-5">
              <label 
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Location
              </label>
              <input 
                name="location" 
                placeholder="Enter location" 
                value={form.location} 
                onChange={handleChange} 
                style={inputStyle} 
                required 
              />
            </div>

            <div className="mb-5">
              <label 
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Venue Type
              </label>
              <select
                name="type" 
                value={form.type} 
                onChange={handleChange} 
                style={inputStyle} 
                required
              >
                <option value="">Select venue type</option>
                <option value="Auditorium">Auditorium</option>
                <option value="Classroom">Classroom</option>
                <option value="Computer Lab">Computer Lab</option>
                <option value="Conference Room">Conference Room</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label 
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Capacity
              </label>
              <input 
                name="capacity" 
                placeholder="Enter capacity" 
                value={form.capacity} 
                onChange={handleChange} 
                style={inputStyle} 
                type="number" 
                min="1"
                required 
              />
            </div>

            <motion.button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all w-full"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Adding..." : "Add Venue"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddVenue;
