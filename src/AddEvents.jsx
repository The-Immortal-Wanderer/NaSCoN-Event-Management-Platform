import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddEvents() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    max_participants: "",
    registration_fee: "",
    category: "",
    rules: "",
    team_allowed: false,
    max_team_participants_limit: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Fix: send null if team_allowed is false
      const payload = {
        ...formData,
        max_team_participants_limit: formData.team_allowed
          ? formData.max_team_participants_limit
          : null,
      };
      const response = await fetch("http://localhost:3000/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Event added successfully!");
        // Redirect to round management form for the new event
        if (result.event_id) {
          navigate(`/events/${result.event_id}/rounds/manage`);
        }
        setFormData({
          name: "",
          description: "",
          max_participants: "",
          registration_fee: "",
          category: "",
          rules: "",
          team_allowed: false,
          max_team_participants_limit: "",
        });
      } else {
        toast.error(result.message || "Failed to add event.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the event.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "var(--glass-border)",
    background: theme === "dark" ? "rgba(26, 19, 51, 0.5)" : "rgba(255, 255, 255, 0.8)",
    color: theme === "dark" ? "#f5e9c9" : "#18122b",
    width: "100%",
    marginBottom: "16px",
    outline: "none",
  };

  return (
    <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
      <motion.h1
        className="font-fraunces text-4xl font-extrabold mb-4 text-center"
        style={{
          color: theme === "dark" ? "#FFC72C" : "#4E2A84",
          letterSpacing: "0.01em",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        Add Event
      </motion.h1>

      <motion.div
        className="w-20 h-1 mb-12"
        style={{
          background: theme === "dark" ? "#FFC72C" : "#4E2A84",
          borderRadius: "1px",
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
              <label
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Maximum Participants
              </label>
              <input
                type="number"
                name="max_participants"
                value={formData.max_participants}
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
                Registration Fee (in Rs.)
              </label>
              <input
                type="number"
                name="registration_fee"
                value={formData.registration_fee}
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
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
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
                Rules
              </label>
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleChange}
                style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-5 flex justify-between items-center">
              <label
                className="font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Team Allowed
              </label>
              <div className="relative inline-block">
                <input
                  type="checkbox"
                  name="team_allowed"
                  id="team_allowed"
                  checked={formData.team_allowed}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label
                  htmlFor="team_allowed"
                  className="flex items-center cursor-pointer"
                >
                  <div
                    className={`w-14 h-7 rounded-full transition-all duration-300 ${
                      formData.team_allowed 
                        ? theme === "dark" ? "bg-gradient-to-r from-amber-400 to-purple-900" : "bg-gradient-to-r from-purple-900 to-amber-400"
                        : theme === "dark" ? "bg-[#3A2A5D]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute w-5 h-5 rounded-full transition-transform duration-300 transform ${
                        formData.team_allowed ? "translate-x-8" : "translate-x-1"
                      } top-1 ${
                        formData.team_allowed 
                          ? "bg-white" 
                          : theme === "dark" ? "bg-[#18122b]" : "bg-white"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
            {formData.team_allowed && (
              <div className="mb-5">
                <label
                  className="block mb-2 font-medium"
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  Maximum Team Participants Limit
                </label>
                <input
                  type="number"
                  name="max_team_participants_limit"
                  value={formData.max_team_participants_limit}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            )}
            <motion.button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all w-full"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? "Adding..." : "Add Event"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddEvents;
