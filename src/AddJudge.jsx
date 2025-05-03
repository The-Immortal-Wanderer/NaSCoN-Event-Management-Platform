import React, { useState, useContext } from "react";
import { ThemeContext } from "./App";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function AddJudge() {
  const { theme } = useContext(ThemeContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: ""
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "judge" })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Judge added successfully!");
        setForm({ name: "", email: "", password: "", contact: "" });
      } else {
        toast.error(data.message || "Failed to add judge.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
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
        Add Judge
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
      <div className="w-full max-w-xl">
        <motion.div
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 font-medium" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-medium" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 font-medium" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                Contact
              </label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                style={inputStyle}
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
              {loading ? "Adding..." : "Add Judge"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddJudge;
