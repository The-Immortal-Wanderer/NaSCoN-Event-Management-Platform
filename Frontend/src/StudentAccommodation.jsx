import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./App";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function StudentAccommodation() {
  const { theme } = useContext(ThemeContext);
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    room_type: "double_night",
    cost: 2000
  });
  const [paymentInfo, setPaymentInfo] = useState({
    account_number: "",
    amount: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);

  useEffect(() => {
    // Fetch the student's accommodation status
    fetchAccommodation();
  }, []);

  const fetchAccommodation = async () => {
    try {
      const response = await fetch("http://localhost:3000/student/accommodation", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAccommodation(data.accommodation);
      } else if (response.status !== 404) {
        // 404 just means no accommodation found, which is a valid state
        toast.error("Failed to fetch accommodation status");
      }
    } catch (error) {
      toast.error("Network error while fetching accommodation status");
    } finally {
      setLoading(false);
    }
  };

  // Update cost based on selected room type
  const handleRoomTypeChange = (e) => {
    const { value } = e.target;
    let cost = 2000; // Default cost
    
    // Set cost based on room type
    switch (value) {
      case "double_night":
        cost = 2000;
        break;
      case "friday_night":
        cost = 1200;
        break;
      case "saturday_night":
        cost = 1200;
        break;
      case "accommodation_only":
        cost = 800;
        break;
    }
    
    setFormData({
      room_type: value,
      cost: cost
    });
    
    // Also update payment amount
    setPaymentInfo(prev => ({
      ...prev,
      amount: cost
    }));
  };

  const handleRequestAccommodation = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:3000/accommodation/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Accommodation request submitted successfully");
        fetchAccommodation(); // Refresh accommodation data
      } else {
        toast.error(data.message || "Failed to submit accommodation request");
      }
    } catch (error) {
      toast.error("Network error while submitting accommodation request");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value
    }));
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    
    if (!accommodation) {
      toast.error("No accommodation found to pay for");
      return;
    }
    
    setPaymentSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:3000/payment/accommodation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          accommodation_id: accommodation.accommodation_id,
          amount: paymentInfo.amount,
          account_number: paymentInfo.account_number
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Payment submitted successfully. Waiting for approval.");
        fetchAccommodation(); // Refresh accommodation data
      } else {
        toast.error(data.message || "Failed to submit payment");
      }
    } catch (error) {
      toast.error("Network error while submitting payment");
    } finally {
      setPaymentSubmitting(false);
    }
  };

  // Style for input fields
  const inputStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid",
    borderColor: theme === "dark" ? "rgba(58, 42, 93, 0.6)" : "rgba(229, 229, 229, 0.8)",
    background: theme === "dark" ? "rgba(26, 19, 51, 0.7)" : "rgba(255, 255, 255, 0.8)",
    color: theme === "dark" ? "#f5e9c9" : "#18122b",
    width: "100%",
    fontFamily: "Inter, sans-serif",
    outline: "none",
    transition: "all 0.3s ease"
  };

  // Function to get user-friendly room type name
  const getRoomTypeName = (type) => {
    const types = {
      "double_night": "Friday & Saturday Night Stay",
      "friday_night": "Friday Night Stay",
      "saturday_night": "Saturday Night Stay",
      "accommodation_only": "Only Accommodation (No Meals)"
    };
    return types[type] || type;
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
        My Accommodation
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
            Accommodation Information
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Request Process:</strong> Submit a request for accommodation during the event. Once approved, you'll need to make a payment to confirm your spot.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Payment Verification:</strong> After submitting payment, the admin team will verify the payment and confirm your accommodation. This process typically takes 24-48 hours.
          </p>
        </div>
      </motion.div>
      
      <div className="w-full max-w-xl">
        {loading ? (
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center" style={{ minHeight: "200px" }}>
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
              Loading accommodation status...
            </div>
          </div>
        ) : accommodation ? (
          <motion.div
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 
              className="font-fraunces text-xl font-bold mb-4" 
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Your Accommodation Request
            </h2>
            
            <div className="mb-6 p-4 rounded-lg" style={{ 
              background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
              border: `1px solid ${theme === "dark" ? "rgba(255, 199, 44, 0.2)" : "rgba(78, 42, 132, 0.2)"}`,
            }}>
              <div className="mb-3">
                <span className="font-semibold mr-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Room Type:</span>
                <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{getRoomTypeName(accommodation.room_type)}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold mr-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Cost:</span>
                <span style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>PKR {accommodation.cost}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold mr-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Status:</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  accommodation.assigned 
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                    : "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100"
                }`}>
                  {accommodation.assigned ? "Assigned" : "Pending Approval"}
                </span>
              </div>
              <div>
                <span className="font-semibold mr-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Payment:</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  accommodation.payment_status 
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                    : accommodation.payment_submitted
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                }`}>
                  {accommodation.payment_status 
                    ? "Payment Confirmed" 
                    : accommodation.payment_submitted
                      ? "Payment Submitted (Awaiting Verification)"
                      : "Payment Required"}
                </span>
              </div>
            </div>
            
            {/* Payment Form - Show only if accommodation is not paid and payment not submitted */}
            {!accommodation.payment_status && !accommodation.payment_submitted && (
              <>
                <h3 
                  className="font-fraunces text-lg font-bold mb-3" 
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  Submit Payment
                </h3>
                <form onSubmit={handleSubmitPayment}>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="account_number"
                      placeholder="Enter your account number"
                      value={paymentInfo.account_number}
                      onChange={handlePaymentChange}
                      style={inputStyle}
                      required
                      className="mb-3"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                      Amount (PKR)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      value={paymentInfo.amount || accommodation.cost}
                      onChange={handlePaymentChange}
                      style={inputStyle}
                      required
                      className="mb-3"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg w-full mt-2"
                    style={{
                      background: theme === "dark" 
                        ? "linear-gradient(to right, #FFC72C, #4E2A84)"
                        : "linear-gradient(to right, #4E2A84, #FFC72C)"
                    }}
                    disabled={paymentSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {paymentSubmitting ? "Processing..." : "Submit Payment"}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        ) : (
          // No accommodation requested yet - show request form
          <motion.div
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 
              className="font-fraunces text-xl font-bold mb-6" 
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Request Accommodation
            </h2>
            
            <form onSubmit={handleRequestAccommodation}>
              <div className="mb-6">
                <label className="block mb-2 font-medium" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                  Accommodation Type
                </label>
                <select
                  name="room_type"
                  value={formData.room_type}
                  onChange={handleRoomTypeChange}
                  style={inputStyle}
                  required
                  className="mb-2"
                >
                  <option value="double_night">Friday & Saturday Night Stay (PKR 2000)</option>
                  <option value="friday_night">Friday Night Only (PKR 1200)</option>
                  <option value="saturday_night">Saturday Night Only (PKR 1200)</option>
                  <option value="accommodation_only">Only Accommodation - No Meals (PKR 800)</option>
                </select>
              </div>
              
              <div className="mb-6 p-4 rounded-lg" style={{ 
                background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
              }}>
                <h3 className="font-semibold mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                  Selected Package:
                </h3>
                <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }} className="mb-2">
                  {getRoomTypeName(formData.room_type)}
                </p>
                <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                  Cost: <span className="font-semibold">PKR {formData.cost}</span>
                </p>
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
                {submitting ? "Submitting..." : "Request Accommodation"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default StudentAccommodation;
