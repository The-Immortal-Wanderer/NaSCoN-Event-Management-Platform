import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./App";
import { motion } from "framer-motion";

function AccommodationDetails() {
  const { theme } = useContext(ThemeContext);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/accommodation/details", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => {
        setDetails(data.details || []);
        setLoading(false);
      });
  }, []);

  // Card transition variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        bounce: 0.2
      }
    })
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
        Accommodation Details
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
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {loading ? (
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
              <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                Loading accommodation details...
              </div>
            </div>
          ) : details.length === 0 ? (
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }} className="text-center py-6">
              <div className="text-lg mb-3" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                No Accommodation Details
              </div>
              <p>No accommodation details have been recorded yet.</p>
            </div>
          ) : (
            <>
              <h2 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Student Accommodations
              </h2>
              <div className="space-y-3">
                {details.map((accommodation, i) => (
                  <motion.div
                    key={accommodation.accommodation_id}
                    className="rounded-lg px-4 py-3 shadow-sm"
                    style={{ 
                      background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
                      borderLeft: `3px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`
                    }}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                      {accommodation.participant_name}
                    </div>
                    <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                      {accommodation.room_type} • {accommodation.cost} Rs
                    </div>
                    <div className="text-xs mt-1">
                      <span 
                        className={`px-2 py-1 rounded-full ${accommodation.assigned 
                          ? "bg-green-100 text-green-800" 
                          : "bg-amber-100 text-amber-800"}`}
                      >
                        {accommodation.assigned ? "Assigned" : "Pending"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AccommodationDetails;
