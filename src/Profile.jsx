import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch {}
  }, []);

  if (!user) return (
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
        My Profile
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
        <div className="glass-card p-8 text-center rounded-xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
          Loading profile...
        </div>
      </div>
    </div>
  );

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
        My Profile
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
          <div className="mb-6 pb-6 border-b" style={{ borderColor: theme === "dark" ? "#3A2A5D" : "#E5E5E5" }}>
            <div className="text-2xl font-fraunces mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
              {user.name}
            </div>
            <div className="text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </div>
          </div>

          <div className="mb-4">
            <span className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Email:</span>{" "}
            <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{user.email}</span>
          </div>
          
          <div className="mb-4">
            <span className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Contact:</span>{" "}
            <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{user.contact}</span>
          </div>
          
          <div className="mb-4">
            <span className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Role:</span>{" "}
            <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{user.role}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
