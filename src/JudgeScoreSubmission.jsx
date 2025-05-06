import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";
import { toast } from "react-toastify";

function JudgeScoreSubmission() {
  const { eventId, teamId } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [event, setEvent] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [existingScores, setExistingScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [scoreForm, setScoreForm] = useState({
    event_round_id: "",
    score: "",
    comments: ""
  });

  useEffect(() => {
    Promise.all([
      // Fetch event details
      fetch(`http://localhost:3000/events`).then(res => res.json()),
      
      // Fetch rounds for this event
      fetch(`http://localhost:3000/event/${eventId}/rounds`).then(res => res.json()),
      
      // Fetch participants for this team
      fetch(`http://localhost:3000/participants/event/${eventId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }).then(res => res.json()),
      
      // Fetch existing scores for this team
      fetch(`http://localhost:3000/judge/scores/${eventId}/${teamId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }).then(res => res.json())
    ])
      .then(([eventsData, roundsData, participantsData, scoresData]) => {
        // Process fetched data
        const foundEvent = (eventsData.events || []).find(e => String(e.event_id) === String(eventId));
        setEvent(foundEvent);
        
        const eventRounds = roundsData.event_rounds || [];
        setRounds(eventRounds);
        
        if (eventRounds.length > 0) {
          setScoreForm(form => ({ ...form, event_round_id: eventRounds[0].event_round_id }));
        }
        
        const team = (participantsData.participants || []).filter(p => p.team_id === teamId);
        setTeamMembers(team);
        
        // Process existing scores
        const scores = {};
        (scoresData.scores || []).forEach(score => {
          scores[score.event_round_id] = {
            score: score.score,
            comments: score.comments
          };
        });
        setExistingScores(scores);
        
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        toast.error("Failed to load required data");
        setLoading(false);
      });
  }, [eventId, teamId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setScoreForm({ ...scoreForm, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    
    // Validate score
    const scoreValue = parseFloat(scoreForm.score);
    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 10) {
      toast.error("Score must be between 0 and 10");
      setSubmitting(false);
      return;
    }
    
    fetch("http://localhost:3000/judge/mark-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        team_id: teamId,
        event_round_id: scoreForm.event_round_id,
        score: scoreForm.score,
        comments: scoreForm.comments
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          toast.success(data.message);
          // Update local state to reflect the new score
          setExistingScores({
            ...existingScores,
            [scoreForm.event_round_id]: {
              score: scoreForm.score,
              comments: scoreForm.comments
            }
          });
          
          // Reset form
          setScoreForm({
            ...scoreForm,
            score: "",
            comments: ""
          });
        } else {
          toast.error(data.error || "Failed to submit score");
        }
      })
      .catch(error => {
        toast.error("An error occurred while submitting the score");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  
  // Get the round name from its ID
  const getRoundName = (roundId) => {
    const round = rounds.find(r => r.event_round_id === parseInt(roundId));
    return round ? round.roundType : "Unknown Round";
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

  if (loading) {
    return (
      <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
        <div className="glass-card p-8 text-center rounded-xl w-full max-w-4xl" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
          Loading submission form...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-28 pb-6 px-4 flex flex-col items-center w-full">
        <div className="glass-card p-8 text-center rounded-xl w-full max-w-4xl text-red-500">
          Event not found.
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
        Score Team
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
      
      <div className="w-full max-w-3xl">
        <motion.div
          className="glass-card rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-fraunces text-xl font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
            {event.name} - Team {teamId}
          </h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Team Members:</h3>
            <div className="space-y-1">
              {teamMembers.length === 0 ? (
                <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
                  No team members found.
                </div>
              ) : (
                teamMembers.map(member => (
                  <div key={member.participant_id} style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                    • {member.name}
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Existing scores section */}
        <motion.div
          className="glass-card rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-fraunces text-xl font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
            Previous Scores
          </h2>
          
          {Object.keys(existingScores).length === 0 ? (
            <div style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>
              No scores have been submitted for this team yet.
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(existingScores).map(([roundId, scoreData]) => (
                <div 
                  key={roundId} 
                  className="p-4 rounded-lg"
                  style={{ background: theme === "dark" ? "rgba(42, 30, 77, 0.3)" : "rgba(255, 255, 255, 0.5)" }}
                >
                  <div className="flex justify-between mb-2">
                    <div className="font-bold" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                      {getRoundName(roundId)}
                    </div>
                    <div 
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{ 
                        background: theme === "dark" ? "#FFC72C" : "#4E2A84",
                        color: theme === "dark" ? "#18122B" : "#FFFFFF"
                      }}
                    >
                      {scoreData.score}/10
                    </div>
                  </div>
                  {scoreData.comments && (
                    <div className="text-sm mt-1" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                      "{scoreData.comments}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Score submission form */}
        <motion.div
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-fraunces text-xl font-bold mb-4" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
            Submit Score
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label 
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Round
              </label>
              <select
                name="event_round_id"
                value={scoreForm.event_round_id}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                {rounds.map(round => (
                  <option key={round.event_round_id} value={round.event_round_id}>
                    {round.roundType} ({new Date(round.date_time).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-5">
              <label 
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Score (0-10)
              </label>
              <input
                type="number"
                name="score"
                value={scoreForm.score}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                style={inputStyle}
                required
              />
            </div>
            
            <div className="mb-6">
              <label 
                className="block mb-2 font-medium"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Comments
              </label>
              <textarea
                name="comments"
                value={scoreForm.comments}
                onChange={handleChange}
                style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                placeholder="Provide constructive feedback about the performance..."
                rows="4"
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <motion.button
                type="button"
                className="px-5 py-2 rounded-lg font-bold text-sm border-2"
                style={{
                  borderColor: theme === "dark" ? "#FFC72C" : "#4E2A84",
                  color: theme === "dark" ? "#FFC72C" : "#4E2A84",
                  background: "transparent"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/judge/event/${eventId}`)}
              >
                Back to Teams
              </motion.button>
              
              <motion.button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-base text-white shadow-lg"
                style={{
                  background: theme === "dark" 
                    ? "linear-gradient(to right, #FFC72C, #4E2A84)" 
                    : "linear-gradient(to right, #4E2A84, #009688)"
                }}
                disabled={submitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {submitting ? "Submitting..." : "Submit Score"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default JudgeScoreSubmission;
