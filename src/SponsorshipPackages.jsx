import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function SponsorshipPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch("http://localhost:3000/sponsorship/packages")
      .then(res => res.json())
      .then(data => {
        setPackages(data.packages || []);
        setLoading(false);
      });
  }, []);

  function handleSelect(pkg) {
    toast.info(`Selected package: ${pkg.name}`);
  }

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
        Sponsorship Packages
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
        {loading ? (
          <div 
            className="glass-card p-8 text-center rounded-xl"
            style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}
          >
            {packages.length === 0
              ? "No sponsorship packages yet."
              : "Loading packages..."}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {packages.map(pkg => (
              <motion.div
                key={pkg.package_id}
                className="glass-card rounded-2xl p-8 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: pkg.package_id * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <h2
                  className="font-fraunces text-2xl font-bold mb-3"
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  {pkg.name}
                </h2>
                <div className="text-lg font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#FFB300" }}>
                  Rs. {pkg.price}
                </div>
                <div className="mb-6 flex-grow" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                  {pkg.perks}
                </div>
                <button 
                  className="px-6 py-2 rounded-lg font-fraunces font-semibold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all border-b-4 border-purple-900"
                  style={{
                    boxShadow: "0 2px 12px #4E2A8433",
                    borderBottomWidth: "3px",
                  }}
                  onClick={() => handleSelect(pkg)}
                >
                  Select Package
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SponsorshipPackages;