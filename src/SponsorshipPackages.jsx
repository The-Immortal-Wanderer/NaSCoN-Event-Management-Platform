import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SponsorshipPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="font-fraunces text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 mb-8">
        Sponsorship Packages
      </h1>
      {loading ? (
        <div className="text-lg text-gray-500">Loading packages...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {packages.map(pkg => (
            <motion.div
              key={pkg.package_id}
              className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg border border-amber-100 p-6 flex flex-col"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="font-fraunces text-2xl font-bold text-purple-900 mb-2">{pkg.name}</h2>
              <div className="text-gray-700 mb-2">{pkg.perks}</div>
              <div className="text-lg font-bold text-amber-600 mb-4">Rs. {pkg.price}</div>
              {/* Add sponsorship action here */}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SponsorshipPackages;
