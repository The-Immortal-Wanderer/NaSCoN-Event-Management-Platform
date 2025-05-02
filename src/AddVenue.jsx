import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddVenue() {
  const [form, setForm] = useState({ name: "", location: "", type: "", capacity: "" });
  const [message, setMessage] = useState("");

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

  return (
    <div className="max-w-xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link to="/dashboard" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">Dashboard</Link>
      </div>
      <h1 className="font-fraunces text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 mb-8">
        Add Venue
      </h1>
      <form onSubmit={handleSubmit} className="bg-white/80 rounded-2xl shadow-lg border border-amber-100 p-8 flex flex-col gap-4">
        <input name="name" placeholder="Venue Name" value={form.name} onChange={handleChange} className="input" required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="input" required />
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} className="input" required />
        <input name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} className="input" type="number" required />
        <button type="submit" className="px-7 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all">
          Add Venue
        </button>
        {message && <div className="mt-2 text-green-700">{message}</div>}
      </form>
    </div>
  );
}

export default AddVenue;
