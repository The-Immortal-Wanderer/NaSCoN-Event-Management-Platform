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
      
      {/* Important Information Section */}
      <motion.div
        className="w-full max-w-4xl glass-card mb-8 rounded-xl overflow-hidden"
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
            Sponsorship Information
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Selection Process:</strong> Choose a sponsorship package that aligns with your organization's goals. After selecting a package, you'll proceed to payment verification before your sponsorship is activated.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Benefits:</strong> Each package offers different levels of brand visibility and engagement opportunities. Your organization's logo and details will be featured according to the selected package's benefits.
          </p>
        </div>
      </motion.div>
      
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