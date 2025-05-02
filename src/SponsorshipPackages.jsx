import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeContext } from "./App";

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

  return (
    <div className="max-w-4xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link to="/" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">Home</Link>
        <Link to="/dashboard" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all">Dashboard</Link>
      </div>
      <h1
        className="font-fraunces text-4xl font-extrabold mb-8"
        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
      >
        Sponsorship Packages
      </h1>
      {loading ? (
        <div className="text-lg" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>Loading packages...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {packages.map(pkg => (
            <motion.div
              key={pkg.package_id}
              className="rounded-2xl backdrop-blur-xl p-6 flex flex-col"
              style={{
                background: "var(--glass-bg)",
                border: "var(--glass-border)",
                boxShadow: "var(--glass-shadow)"
              }}
              whileHover={{ scale: 1.03 }}
            >
              <h2
                className="font-fraunces text-2xl font-bold mb-2"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                {pkg.name}
              </h2>
              <div className="mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{pkg.perks}</div>
              <div className="text-lg font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#FFB300" }}>Rs. {pkg.price}</div>
              {/* Add sponsorship action here */}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SponsorshipPackages;
