import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function AdminPaymentApproval() {
  const { theme } = useContext(ThemeContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);
  
  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:3000/pending-payments", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments || []);
      } else {
        toast.error("Failed to fetch payment requests");
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Network error while fetching payments");
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyPayment = async (paymentId) => {
    setProcessing(true);
    try {
      const response = await fetch("http://localhost:3000/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ payment_id: paymentId })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Payment successfully verified!");
        // Remove the verified payment from the list
        setPayments(payments.filter(payment => payment.payment_id !== paymentId));
      } else {
        toast.error(data.message || "Failed to verify payment");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Network error while verifying payment");
    } finally {
      setProcessing(false);
    }
  };
  
  // Card animation variants
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
        Verify Event Payments
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
            Payment Verification Guidelines
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Verification Process:</strong> Check the account number and payment amount against your financial records before approving. Once verified, students will be able to fully access the event.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Automatic Update:</strong> Upon verification, the system will automatically update the participant's registration status. Participants will be notified via email when their payment is verified.
          </p>
        </div>
      </motion.div>
      
      <div className="w-full max-w-4xl">
        <motion.div
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 
            className="font-fraunces text-xl font-bold mb-6"
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          >
            Pending Payment Verifications
          </h2>
          
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
                Loading payment requests...
              </div>
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-12" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-lg font-medium mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                All caught up!
              </div>
              <p>There are no pending payment verifications at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment, i) => (
                <motion.div
                  key={payment.payment_id}
                  className="rounded-lg p-6 shadow-sm"
                  style={{ 
                    background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
                    border: `1px solid ${theme === "dark" ? "#3A2A5D" : "#E5E5E5"}`
                  }}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <div className="font-bold text-lg mb-1" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                        {payment.event_name}
                      </div>
                      <div style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }} className="mb-1">
                        <span className="font-medium">Participant:</span> {payment.user_name} ({payment.user_email})
                      </div>
                      <div className="mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                        <span className="font-medium">Team ID:</span> {payment.team_id}
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 text-sm mb-3">
                        <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                          <span className="font-medium">Amount:</span> PKR {payment.amount}
                        </div>
                        <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                          <span className="font-medium">Account #:</span> {payment.account_number}
                        </div>
                        <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                          <span className="font-medium">Date:</span> {new Date(payment.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <motion.button
                        onClick={() => handleVerifyPayment(payment.payment_id)}
                        disabled={processing}
                        className="px-4 py-2 rounded-lg font-bold text-sm text-white shadow-lg"
                        style={{
                          background: theme === "dark" 
                            ? "linear-gradient(to right, #2E7D32, #4E2A84)"  // dark mode green gradient
                            : "linear-gradient(to right, #4E2A84, #2E7D32)"  // light mode purpleish-green gradient
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {processing ? "Processing..." : "Verify Payment"}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AdminPaymentApproval;
