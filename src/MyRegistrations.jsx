import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function MyRegistrations() {
  const { theme } = useContext(ThemeContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

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
        My Registrations
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
      
      <div className="w-full max-w-4xl">
        <motion.div
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {loading ? (
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              {registrations.length === 0
                ? "No registrations yet."
                : "Loading your registrations..."}
            </div>
          ) : registrations.length > 0 ? (
            <div className="space-y-4">
              {/* Map over registrations here */}
              <div style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                Your event registrations will be listed here.
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-lg mb-3" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                No Registrations Yet
              </div>
              <p style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                You haven't registered for any events. Browse our events page to find interesting competitions!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MyRegistrations;
