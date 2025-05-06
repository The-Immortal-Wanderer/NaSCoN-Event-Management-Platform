import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./App";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function VerifyPayments() {
  const { theme } = useContext(ThemeContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/pending-payments", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => {
        setPayments(data.payments || []);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to load payments");
        setLoading(false);
      });
  }, []);

  const handleVerify = (payment_id) => {
    fetch("http://localhost:3000/payment/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ payment_id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          toast.success(data.message);
          setPayments(payments.filter(p => p.payment_id !== payment_id));
        } else {
          toast.error(data.error || "Failed to verify payment.");
        }
      })
      .catch(error => {
        toast.error("An error occurred while verifying the payment.");
      });
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
        Verify Payments
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
            Payment Verification Process
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Verification Impact:</strong> Payments must be verified before participants can access event features, accommodation can be assigned, or sponsorships are confirmed. This is a critical administrative duty.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Verification Steps:</strong> Review the payment record, confirm the account number with your financial records, then approve if valid. Once verified, the system will automatically update the related registration status.
          </p>
        </div>
      </motion.div>
      
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
                Loading payment information...
              </div>
            </div>
          ) : payments.length === 0 ? (
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }} className="text-center py-6">
              <div className="text-lg mb-3" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                No Pending Payments
              </div>
              <p>There are no payments waiting for verification at the moment.</p>
            </div>
          ) : (
            <>
              <h2 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Pending Payments
              </h2>
              <div className="space-y-3">
                {payments.map((payment, i) => (
                  <motion.div
                    key={payment.payment_id}
                    className="rounded-lg px-4 py-3 shadow-sm"
                    style={{ 
                      background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
                    }}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                          Payment #{payment.payment_id}
                        </div>
                        <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                          {payment.user_name} • {payment.amount} Rs
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleVerify(payment.payment_id)}
                        className="px-4 py-2 rounded-lg font-bold text-white shadow-lg"
                        style={{
                          background: `linear-gradient(to right, ${theme === "dark" ? "#2E7D32, #4E2A84" : "#4E2A84, #009688"})`
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Verify
                      </motion.button>
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

export default VerifyPayments;
