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
        toast.success("Event request sent for approval! You'll be notified when an admin reviews your request.");
        // Navigate to the manage events page
        navigate("/events/manage");
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
            Important Information for Organizers
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Event Creation Process:</strong> After submitting this form, your event will require admin approval before participants can register. Once approved, you'll be able to manage registrations and event rounds.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Admin Review:</strong> Admins will review your event details to ensure it meets our guidelines. Events that are approved will be visible to participants.
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
              {loading ? "Submitting..." : "Submit Event for Approval"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AddEvents;
