import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";

function AddVenue() {
  const [form, setForm] = useState({ name: "", location: "", type: "", capacity: "" });
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/addVenue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => setMessage(data.message || "Venue added!"));
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
    <div className="pt-28 pb-6 px-4 max-w-xl mx-auto">
      <h1
        className="font-fraunces text-3xl font-extrabold mb-6"
        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
      >
        Add Venue
      </h1>

      <motion.form
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6">
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

        <div className="mb-6">
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

        <div className="mb-6">
          <label 
            className="block mb-2 font-medium"
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          >
            Type
          </label>
          <input 
            name="type" 
            placeholder="Enter venue type" 
            value={form.type} 
            onChange={handleChange} 
            style={inputStyle} 
            required 
          />
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
            required 
          />
        </div>

        <button 
          type="submit" 
          className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all w-full"
        >
          Add Venue
        </button>
        
        {message && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 rounded-lg text-center"
            style={{ 
              color: theme === "dark" ? "#FFC72C" : "#2E7D32",
              background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(46, 125, 50, 0.1)" 
            }}
          >
            {message}
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}

export default AddVenue;
