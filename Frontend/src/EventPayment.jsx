import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from './App';
import { toast } from 'react-toastify';

function EventPayment() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    payment_type: "bank_transfer",
    account_number: "",
    amount: ""
  });

  // Get team_id from URL query params
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get('team_id');

  useEffect(() => {
    if (!teamId) {
      toast.error("Missing team information");
      navigate(`/event/${eventId}`);
      return;
    }

    fetch(`http://localhost:3000/events`)
      .then(res => res.json())
      .then(data => {
        const eventData = data.events.find(e => String(e.event_id) === String(eventId));
        if (eventData) {
          setEvent(eventData);
          // Pre-fill the amount with event registration fee
          setPaymentInfo(prev => ({
            ...prev,
            amount: eventData.registration_fee
          }));
        } else {
          toast.error("Event not found");
          navigate("/events");
        }
        setLoading(false);
      })
      .catch(error => {
        toast.error("Error loading event details");
        setLoading(false);
      });
  }, [eventId, navigate, teamId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/add-payment/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...paymentInfo,
          event_id: eventId,
          team_id: teamId
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Payment submitted successfully! An admin will verify your payment soon.");
        navigate('/my-registrations');
      } else {
        toast.error(data.message || "Payment submission failed");
      }
    } catch (error) {
      toast.error("An error occurred during payment submission");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid",
    borderColor: theme === "dark" ? "rgba(58, 42, 93, 0.6)" : "rgba(229, 229, 229, 0.8)",
    background: theme === "dark" ? "rgba(26, 19, 51, 0.7)" : "rgba(255, 255, 255, 0.8)",
    color: theme === "dark" ? "#f5e9c9" : "#18122b",
    width: "100%",
    marginBottom: "16px",
    outline: "none"
  };

  if (loading) {
    return (
      <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
        <div className="glass-card p-8 text-center rounded-xl w-full max-w-xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full mx-auto mb-4"
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
          Loading payment details...
        </div>
      </div>
    );
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
        Complete Your Payment
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
        className="w-full max-w-xl glass-card mb-8 rounded-xl overflow-hidden"
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
            Payment Information
          </h2>
          <div className="mb-4" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <div className="font-medium">Event: <span className="font-bold">{event?.name}</span></div>
            <div className="font-medium">Registration Fee: <span className="font-bold">PKR {event?.registration_fee}</span></div>
            <div className="font-medium">Team ID: <span className="font-bold">{teamId}</span></div>
          </div>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Payment Instructions:</strong> Please enter your payment details below. Make sure to include the correct account number you used for the bank transfer.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Verification Process:</strong> An administrator will verify your payment within 24-48 hours. You can check the status of your payment in the "My Registrations" section.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-xl glass-card p-8 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 font-medium"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Payment Type
            </label>
            <select
              name="payment_type"
              value={paymentInfo.payment_type}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="jazz_cash">JazzCash</option>
              <option value="easypaisa">Easypaisa</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 font-medium"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Transaction/Account Number
            </label>
            <input
              type="text"
              name="account_number"
              value={paymentInfo.account_number}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your transaction or account number"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 font-medium"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Amount (PKR)
            </label>
            <input
              type="number"
              name="amount"
              value={paymentInfo.amount}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter amount"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg w-full"
            style={{
              background: theme === "dark" 
                ? "linear-gradient(to right, #FFC72C, #4E2A84)"
                : "linear-gradient(to right, #4E2A84, #FFC72C)"
            }}
            disabled={submitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {submitting ? "Processing..." : "Submit Payment"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default EventPayment;
