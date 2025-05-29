import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function EventRegistration() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [teamMembers, setTeamMembers] = useState([{ email: "" }]);
  const [validateStatus, setValidateStatus] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUser(userInfo);
    } catch (error) {
      console.error("Error parsing user info", error);
    }
    
    fetch(`http://localhost:3000/events`)
      .then(res => res.json())
      .then(data => {
        const eventData = data.events.find(e => String(e.event_id) === String(eventId));
        if (eventData) {
          setEvent(eventData);
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
  }, [eventId, navigate]);

  const handleTeamMemberChange = (index, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index].email = value;
    setTeamMembers(updatedTeamMembers);
    
    const updatedStatus = [...validateStatus];
    updatedStatus[index] = null;
    setValidateStatus(updatedStatus);
  };

  const addTeamMember = () => {
    if (event && teamMembers.length < event.max_team_participants_limit) {
      setTeamMembers([...teamMembers, { email: "" }]);
      setValidateStatus([...validateStatus, null]);
    } else {
      toast.warning(`Maximum team size is ${event.max_team_participants_limit}`);
    }
  };

  const removeTeamMember = (index) => {
    if (teamMembers.length > 1) {
      const updatedTeamMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(updatedTeamMembers);
      
      const updatedStatus = validateStatus.filter((_, i) => i !== index);
      setValidateStatus(updatedStatus);
    }
  };

  const validateEmail = async (email, index) => {
    if (!email) return;
    
    try {
      const response = await fetch(`http://localhost:3000/check-user-exists?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      const newStatus = [...validateStatus];
      newStatus[index] = data.exists;
      setValidateStatus(newStatus);
      
      if (!data.exists) {
        toast.error(`User with email ${email} does not exist in the system`);
      }
    } catch (error) {
      console.error("Error validating email:", error);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to register for events");
      navigate("/login");
      return;
    }
    
    // Filter out empty email fields
    const validEmails = teamMembers
      .map(member => member.email.trim())
      .filter(email => email !== "" && email !== user.email);
    
    // Check if any team member doesn't exist
    const hasInvalidMember = validateStatus.some(status => status === false);
    if (hasInvalidMember) {
      toast.error("Some team members don't exist in the system");
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/add-participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          event_id: eventId,
          emails: validEmails,
          team_allowed: event.team_allowed,
          max_team_participants_limit: event.max_team_participants_limit
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Registration successful! Proceed to payment.");
        navigate(`/payment/event/${eventId}?team_id=${data.team_id}`);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
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
    fontFamily: "Inter, sans-serif",
    outline: "none",
    transition: "all 0.3s ease"
  };

  if (loading) {
    return (
      <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
        <div className="glass-card p-8 text-center rounded-2xl w-full max-w-xl">
          <div className="flex flex-col items-center justify-center">
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
              Loading event details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
        <div className="glass-card p-8 text-center rounded-2xl w-full max-w-xl">
          <h2 
            className="font-fraunces text-xl font-bold mb-4"
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          >
            Event Not Found
          </h2>
          <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            The event you're looking for could not be found.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 mt-4 rounded-xl font-bold text-base text-white shadow-lg hover:scale-105 transition-all"
            style={{
              background: theme === "dark" 
                ? "linear-gradient(to right, #FFC72C, #4E2A84)"
                : "linear-gradient(to right, #4E2A84, #FFC72C)"
            }}
          >
            Return to Events
          </button>
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
        Register for Event
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
            className="font-fraunces text-xl font-bold mb-3"
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          >
            {event.name}
          </h2>
          <div className="mb-3" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            {event.description}
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Category:</span> {event.category}
            </div>
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              <span className="font-semibold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Fee:</span> PKR {event.registration_fee}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="w-full max-w-xl glass-card p-8 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 
          className="font-fraunces text-xl font-bold mb-4"
          style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
        >
          {event.team_allowed ? "Team Registration" : "Individual Registration"}
        </h2>
        
        <form onSubmit={handleRegistration}>
          {event.team_allowed ? (
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-medium text-lg" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                  Team Members
                </h3>
                {teamMembers.length < (event?.max_team_participants_limit || 1) && (
                  <motion.button
                    type="button"
                    onClick={addTeamMember}
                    className="px-4 py-2 rounded-lg font-medium text-sm"
                    style={{
                      color: theme === "dark" ? "#FFC72C" : "#4E2A84",
                      border: `1px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    + Add Member
                  </motion.button>
                )}
              </div>
                
              <div className="text-sm mb-4" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                You will be automatically added as the team captain. Add your team members' emails below.
              </div>
                
              <div className="mb-3 p-3 rounded-lg" style={{ 
                background: theme === "dark" ? "rgba(58, 42, 93, 0.3)" : "rgba(229, 229, 229, 0.3)",
              }}>
                <div className="flex justify-between items-center">
                  <div className="font-medium" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Team Captain (You)</div>
                  <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>{user?.email}</div>
                </div>
              </div>
              
              {/* Team member input fields */}
              {teamMembers.map((member, index) => (
                <div key={index} className="mb-3 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder={`Team member ${index + 1} email`}
                      value={member.email}
                      onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                      onBlur={() => validateEmail(member.email, index)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid",
                        borderColor: validateStatus[index] === false ? "red" : theme === "dark" ? "rgba(58, 42, 93, 0.6)" : "rgba(229, 229, 229, 0.8)",
                        background: theme === "dark" ? "rgba(26, 19, 51, 0.5)" : "rgba(255, 255, 255, 0.8)",
                        color: theme === "dark" ? "#f5e9c9" : "#18122b",
                        width: "100%",
                        outline: "none"
                      }}
                    />
                    {validateStatus[index] === true && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        ✓
                      </span>
                    )}
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="p-2 bg-transparent rounded-full flex-shrink-0"
                    style={{
                      color: theme === "dark" ? "rgba(255, 199, 44, 0.7)" : "rgba(78, 42, 132, 0.7)"
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-6" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              You are registering individually for this event. After registration, you'll be directed to make the payment.
            </div>
          )}

          <div className="mb-6 p-4 rounded-lg" style={{ 
            background: theme === "dark" ? "rgba(58, 42, 93, 0.3)" : "rgba(229, 229, 229, 0.3)",
          }}>
            <h3 className="font-medium mb-1" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
              Registration Summary
            </h3>
            <div style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              <div>Event: {event.name}</div>
              <div>Registration Fee: PKR {event.registration_fee}</div>
              {event.team_allowed && (
                <div>Team Size: {1 + teamMembers.filter(m => m.email.trim() !== "").length}</div>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg w-full"
            style={{
              background: theme === "dark" 
                ? "linear-gradient(to right, #FFC72C, #4E2A84)"
                : "linear-gradient(to right, #4E2A84, #FFC72C)",
              opacity: submitting ? 0.7 : 1
            }}
            disabled={submitting}
            whileHover={{ scale: submitting ? 1 : 1.03 }}
            whileTap={{ scale: submitting ? 1 : 0.97 }}
          >
            {submitting ? "Processing..." : "Register Now"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default EventRegistration;