import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function MyRegistrations() {
  const { theme } = useContext(ThemeContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("http://localhost:3000/my-registrations", {
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data.registrations || []);
      } else {
        toast.error("Failed to fetch your registrations");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Error connecting to the server");
      setLoading(false);
    }
  };

  const handlePayment = (e, eventId, teamId) => {
    e.preventDefault();
    navigate(`/payment/event/${eventId}?team_id=${teamId}`);
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

  // Helper function to get status badge styling
  const getStatusBadge = (paymentStatus) => {
    if (paymentStatus) {
      return {
        bg: theme === "dark" ? "bg-green-800" : "bg-green-100",
        text: theme === "dark" ? "text-green-100" : "text-green-800",
        label: "Payment Verified"
      };
    } else {
      return {
        bg: theme === "dark" ? "bg-amber-800" : "bg-amber-100",
        text: theme === "dark" ? "text-amber-100" : "text-amber-800",
        label: "Payment Pending"
      };
    }
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
            Registration Information
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Event Updates:</strong> After your registration is confirmed, you'll receive details about venue and schedule here. Check back regularly for any updates from organizers.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Payment Status:</strong> For registrations with pending payment, click the "Make Payment" button to complete your registration. Payments are verified by administrators within 24 hours.
          </p>
        </div>
      </motion.div>
      
      <div className="w-full max-w-4xl">
        {loading ? (
          <div className="glass-card p-8 text-center rounded-xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
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
              Your event registrations will be listed here.
            </div>
          </div>
        ) : registrations.length === 0 ? (
          <div className="glass-card p-8 text-center rounded-xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
            <div className="flex flex-col items-center justify-center h-40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              You haven't registered for any events. Browse our events page to find interesting competitions!
            </div>
            <Link to="/events">
              <motion.button
                className="mt-6 px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg"
                style={{
                  background: theme === "dark" 
                    ? "linear-gradient(to right, #FFC72C, #4E2A84)"
                    : "linear-gradient(to right, #4E2A84, #FFC72C)"
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Browse Events
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {registrations.map((reg, i) => {
              const statusBadge = getStatusBadge(reg.payment_status);
              
              return (
                <motion.div
                  key={reg.participant_id}
                  className="rounded-2xl backdrop-blur-xl p-6 flex flex-col glass-card relative"
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Status badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                    {statusBadge.label}
                  </div>
                  
                  <h3
                    className="font-fraunces text-xl font-bold mb-2 pr-24" // Add padding to prevent overlap with badge
                    style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                  >
                    {reg.event_name}
                  </h3>
                  
                  <div className="text-sm mb-2" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                    {/* Show team ID if it exists */}
                    {reg.team_id && <div><strong>Team ID:</strong> {reg.team_id}</div>}
                    <div><strong>Category:</strong> {reg.event_category}</div>
                    <div><strong>Registration Date:</strong> {new Date(reg.registration_date).toLocaleDateString()}</div>
                  </div>
                  
                  <div className="mt-auto">
                    {/* If payment not made, show payment button */}
                    {!reg.payment_status ? (
                      <motion.button
                        onClick={(e) => handlePayment(e, reg.event_id, reg.team_id)}
                        className="px-6 py-2 rounded-xl font-bold text-base text-white shadow-lg w-full"
                        style={{
                          background: theme === "dark" 
                            ? "linear-gradient(to right, #FFC72C, #4E2A84)"
                            : "linear-gradient(to right, #4E2A84, #FFC72C)"
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Make Payment
                      </motion.button>
                    ) : (
                      <Link to={`/event/${reg.event_id}`} className="block">
                        <motion.button
                          className="px-6 py-2 rounded-xl font-bold text-base text-white shadow-lg w-full"
                          style={{
                            background: theme === "dark" 
                              ? "linear-gradient(to right, #2E7D32, #388E3C)"
                              : "linear-gradient(to right, #388E3C, #2E7D32)"
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          View Event Details
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRegistrations;
