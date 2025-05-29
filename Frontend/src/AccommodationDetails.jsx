import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "./App";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function AccommodationDetails() {
  const { theme } = useContext(ThemeContext);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchAccommodationDetails();
  }, []);
  
  const fetchAccommodationDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/report/participants-accommodation", {
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDetails(data.data || []);
      } else {
        toast.error("Failed to fetch accommodation details");
      }
    } catch (error) {
      toast.error("Network error while fetching accommodation details");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAcceptRequest = async (accommodationId) => {
    setProcessing(true);
    try {
      const response = await fetch("http://localhost:3000/accommodation/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ accommodation_id: accommodationId })
      });
      
      if (response.ok) {
        toast.success("Accommodation request accepted successfully");
        // Update the local state to reflect the change
        setDetails(details.map(item => 
          item.accommodation_id === accommodationId 
            ? { ...item, assigned: true }
            : item
        ));
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to accept accommodation request");
      }
    } catch (error) {
      toast.error("Network error while processing request");
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

  // Map room types to readable names
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
        Accommodation Requests
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
            Accommodation Management Process
          </h2>
          <p className="text-sm mb-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Approval Requirements:</strong> Accommodation requests should only be approved after payment verification has been completed. The payment status indicator will show whether payment has been verified.
          </p>
          <p className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            <strong>Room Assignment:</strong> After approving a request, the system will mark the accommodation as assigned. Please ensure you have sufficient capacity before approving requests. Approved students will receive notification of their accommodation assignment.
          </p>
        </div>
      </motion.div>
      
      <div className="w-full max-w-4xl">
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
                Loading accommodation requests...
              </div>
            </div>
          ) : details.length === 0 ? (
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }} className="text-center py-6">
              <div className="text-lg mb-3" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                No Accommodation Requests
              </div>
              <p>No accommodation requests have been received yet.</p>
            </div>
          ) : (
            <>
              <h2 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Student Accommodations
              </h2>
              <div className="space-y-4">
                {details.map((accommodation, i) => (
                  <motion.div
                    key={accommodation.accommodation_id}
                    className="rounded-lg px-5 py-4 shadow-sm"
                    style={{ 
                      background: theme === "dark" ? "rgba(42, 30, 77, 0.5)" : "rgba(255, 255, 255, 0.5)",
                      borderLeft: `3px solid ${accommodation.assigned 
                        ? (theme === "dark" ? "#66BB6A" : "#2E7D32")  // green for assigned
                        : (theme === "dark" ? "#FFC72C" : "#4E2A84")}`  // theme color for pending
                    }}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-lg mb-1" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                          {accommodation.participant_name}
                        </div>
                        <div className="mb-1" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                          Package: {getRoomTypeName(accommodation.room_type)}
                        </div>
                        <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                          Cost: PKR {accommodation.cost}
                        </div>
                        <div className="mt-2">
                          <span 
                            className={`px-2 py-1 text-xs rounded-full ${
                              accommodation.payment_status 
                                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                            }`}
                          >
                            {accommodation.payment_status ? "Payment Verified" : "Payment Pending"}
                          </span>
                          <span 
                            className={`ml-2 px-2 py-1 text-xs rounded-full ${
                              accommodation.assigned 
                                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
                                : "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100"
                            }`}
                          >
                            {accommodation.assigned ? "Assigned" : "Pending Approval"}
                          </span>
                        </div>
                      </div>
                      
                      {!accommodation.assigned && accommodation.payment_status && (
                        <motion.button
                          className="px-4 py-2 rounded-lg font-bold text-sm text-white shadow-lg"
                          style={{
                            background: theme === "dark" 
                              ? "linear-gradient(to right, #66BB6A, #2E7D32)"  // dark mode green gradient
                              : "linear-gradient(to right, #2E7D32, #1B5E20)"  // light mode green gradient
                          }}
                          onClick={() => handleAcceptRequest(accommodation.accommodation_id)}
                          disabled={processing}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {processing ? "Processing..." : "Approve"}
                        </motion.button>
                      )}
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

export default AccommodationDetails;
