import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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
    padding: "10px 16px",
    borderRadius: "8px",
    border: "var(--glass-border)",
    background: theme === "dark" ? "rgba(26, 19, 51, 0.5)" : "rgba(255, 255, 255, 0.8)",
    color: theme === "dark" ? "#f5e9c9" : "#18122b",
    width: "100%",
    marginBottom: "12px"
  };

  return (
    <div className="max-w-xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link to="/dashboard" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">Dashboard</Link>
      </div>
      <h1
        className="font-fraunces text-3xl font-extrabold mb-8"
        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
      >
        Add Venue
      </h1>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-8 flex flex-col gap-4"
        style={{
          background: "var(--glass-bg)",
          border: "var(--glass-border)",
          boxShadow: "var(--glass-shadow)"
        }}
      >
        <input name="name" placeholder="Venue Name" value={form.name} onChange={handleChange} style={inputStyle} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} style={inputStyle} required />
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} style={inputStyle} required />
        <input name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} style={inputStyle} type="number" required />
        <button type="submit" className="px-7 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all">
          Add Venue
        </button>
        {message && <div className="mt-2" style={{ color: theme === "dark" ? "#FFC72C" : "#2E7D32" }}>{message}</div>}
      </form>
    </div>
  );
}

export default AddVenue;
