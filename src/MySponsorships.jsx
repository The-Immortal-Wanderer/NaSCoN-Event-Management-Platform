import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./App";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function MySponsorships() {
  const { theme } = useContext(ThemeContext);
  const [sponsorships, setSponsorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentForm, setPaymentForm] = useState({
    sponsorship_id: "",
    payment_type: "bank_transfer",
    account_number: "",
    amount: ""
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    fetchSponsorships();
  }, []);

  const fetchSponsorships = () => {
    fetch("http://localhost:3000/sponsor/sponsorships", {
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch sponsorships");
        return res.json();
      })
      .then(data => {
        setSponsorships(data.sponsorships || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching sponsorships:", error);
        toast.error("Failed to load your sponsorships");
        setLoading(false);
      });
  };

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/payment/add/sponsorship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        ...paymentForm,
        payment_type: paymentForm.payment_type
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Payment submission failed");
        return res.json();
      })
      .then(data => {
        toast.success("Payment submitted successfully");
        setShowPaymentForm(false);
        setPaymentForm({
          sponsorship_id: "",
          payment_type: "bank_transfer",
          account_number: "",
          amount: ""
        });
        fetchSponsorships(); // Refresh the list
      })
      .catch(error => {
        console.error("Payment error:", error);
        toast.error("Failed to submit payment");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const startPayment = (sponsorship_id, amount) => {
    setPaymentForm({
      ...paymentForm,
      sponsorship_id,
      amount
    });
    setShowPaymentForm(true);
  };

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

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

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
        My Sponsorships
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
        className="w-full max-w-3xl glass-card mb-8 rounded-xl overflow-hidden"
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
            Managing Your Sponsorships
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Activation Status:</strong> Your sponsorship will be activated after payment verification. The status indicator shows whether your sponsorship is pending, active, or requires attention.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Materials Submission:</strong> Use this page to upload your organization's logo and promotional materials according to the specifications in your package. Materials must be approved before they appear on event materials.
          </p>
        </div>
      </motion.div>
      
      <div className="w-full max-w-3xl">
        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="glass-card rounded-2xl p-8 max-w-md w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2
                className="font-fraunces text-2xl font-bold mb-6"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Submit Payment
              </h2>
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-5">
                  <label
                    className="block mb-2 font-medium"
                    style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                  >
                    Payment Method
                  </label>
                  <select
                    name="payment_type"
                    value={paymentForm.payment_type}
                    onChange={handlePaymentFormChange}
                    style={inputStyle}
                    required
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="easypaisa">EasyPaisa</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label
                    className="block mb-2 font-medium"
                    style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                  >
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="account_number"
                    value={paymentForm.account_number}
                    onChange={handlePaymentFormChange}
                    style={inputStyle}
                    required
                    placeholder="Enter account number"
                  />
                </div>
                <div className="mb-5">
                  <label
                    className="block mb-2 font-medium"
                    style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                  >
                    Amount (Rs.)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={paymentForm.amount}
                    onChange={handlePaymentFormChange}
                    style={inputStyle}
                    required
                    min="0"
                  />
                </div>
                <div className="flex gap-4 mt-8">
                  <motion.button
                    type="button"
                    className="px-6 py-3 rounded-xl font-bold text-base bg-gray-500 text-white shadow-lg hover:bg-gray-600 transition-all w-1/2"
                    onClick={() => setShowPaymentForm(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all w-1/2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit Payment"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        <motion.div
          className="glass-card rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {loading && !showPaymentForm ? (
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
                Loading your sponsorships...
              </div>
            </div>
          ) : sponsorships.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-lg mb-3" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                No Sponsorships Yet
              </div>
              <p style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                You haven't sponsored any events yet. Browse our sponsorship packages to get started.
              </p>
              <Link to="/sponsorship/packages">
                <motion.button
                  className="mt-6 px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Sponsorship Packages
                </motion.button>
              </Link>
            </div>
          ) : (
            <>
              <h2
                className="font-fraunces text-xl font-bold mb-6"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Your Sponsorships
              </h2>
              <div className="space-y-6">
                {sponsorships.map((sponsorship, i) => (
                  <motion.div
                    key={sponsorship.id}
                    className="rounded-lg p-5 shadow"
                    style={{ 
                      background: theme === "dark" ? "rgba(42, 30, 77, 0.7)" : "rgba(255, 255, 255, 0.9)",
                      borderLeft: `4px solid ${sponsorship.payment_status ? 
                        (theme === "dark" ? "#66BB6A" : "#2E7D32") : 
                        (theme === "dark" ? "#FFC72C" : "#FF9800")}`
                    }}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                          {sponsorship.package_name}
                        </h3>
                        <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                          {sponsorship.perks}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                          Rs. {sponsorship.price}
                        </div>
                        <div className="text-sm">
                          <span 
                            className={`px-2 py-1 text-xs rounded-full ${
                              sponsorship.payment_status 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {sponsorship.payment_status ? "Paid" : "Payment Pending"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                      {!sponsorship.payment_status && (
                        <motion.button
                          className="px-4 py-2 rounded-lg font-bold text-sm bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-md"
                          onClick={() => startPayment(sponsorship.id, sponsorship.price)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Complete Payment
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Bottom CTA */}
        {sponsorships.length > 0 && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/sponsorship/packages">
              <motion.button
                className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-teal-500 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Add Another Sponsorship
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MySponsorships;
