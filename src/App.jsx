import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./Signup";
import Dashboard from "./Dashboard";
import Particles from "./ParticlesBG";
import SacredPattern from "./SacredPatternBG";
import Home from "./Home";
import TopBar from "./TopBar";
import Footer from "./Footer"; // <-- Use the new Footer.jsx file
import Events from "./Events";
import EventDetails from "./EventDetails";
import MyRegistrations from "./MyRegistrations";
import Profile from "./Profile";
import SponsorshipPackages from "./SponsorshipPackages";
import AddVenue from "./AddVenue";

// Move ThemeContext outside of the component to avoid HMR issues
export const ThemeContext = React.createContext();

function App() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState("light");

  // Toggle theme function
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        {/* Global background accessories */}
        <div
          className="fixed inset-0 w-full h-full pointer-events-none z-0"
          style={{
            zIndex: 0,
            width: "100vw",
            height: "100vh",
            minHeight: "100vh",
            minWidth: "100vw",
            top: 0,
            left: 0,
            overflow: "hidden", // Prevent horizontal scroll on background
            // Add dark mode background
            background: theme === "dark"
              ? "radial-gradient(ellipse at 60% 20%, #1a1333 0%, #2a1e4d 60%, #18122b 100%)"
              : "radial-gradient(ellipse at 60% 20%, #FFC72C55 0%, #FFF8E1 60%, #FAF9F6 100%)",
            transition: "background 0.5s",
          }}
        >
          <Particles />
          <SacredPattern />
        </div>
        <div
          className="relative"
          style={{
            zIndex: 1,
            minHeight: "100vh",
            width: "100vw",
            position: "relative",
            overflowX: "hidden", // Prevent horizontal scroll on main content
            color: theme === "dark" ? "#f5e9c9" : undefined,
            transition: "background 0.5s, color 0.5s",
          }}
        >
          {/* Provide theme as prop for TopBar to allow Dashboard button placement */}
          <TopBar theme={theme} />
          <div className="pb-32" style={{ overflowX: "hidden" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:eventId" element={<EventDetails />} />
              <Route path="/my-registrations" element={<MyRegistrations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sponsorship/packages" element={<SponsorshipPackages />} />
              <Route path="/addVenue" element={<AddVenue />} />
              {/* Add more general site pages here */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
        <Footer />
        {/* Optional: Custom scrollbar styling for vertical scroll */}
        <style>{`
          :root {
            /* Theme-based color tokens - updated dynamically */
            --bg-primary: ${theme === "dark" ? "#18122b" : "#FAF9F6"};
            --bg-secondary: ${theme === "dark" ? "#1a1333" : "#FFF8E1"};
            --bg-tertiary: ${theme === "dark" ? "#2a1e4d" : "#FFFFFF"};
            
            --text-primary: ${theme === "dark" ? "#f5e9c9" : "#18122b"};
            --text-secondary: ${theme === "dark" ? "#d6c6a7" : "#4E2A84"};
            --text-tertiary: ${theme === "dark" ? "#b3a689" : "#6C2EB7"};
            
            --border-light: ${theme === "dark" ? "#3A2A5D" : "#E5E5E5"};
            
            /* Semantic colors - adapt based on theme */
            --success: ${theme === "dark" ? "#66BB6A" : "#2E7D32"};
            --info: ${theme === "dark" ? "#29B6F6" : "#0288D1"};
            --warning: ${theme === "dark" ? "#FFB74D" : "#FF9800"};
            --error: ${theme === "dark" ? "#EF5350" : "#C62828"};
            
            /* Glass morphism properties */
            --glass-bg: ${theme === "dark" 
              ? "rgba(26, 19, 51, 0.85)" 
              : "rgba(255, 255, 255, 0.7)"};
            --glass-border: ${theme === "dark" 
              ? "1px solid #3A2A5D" 
              : "1px solid #f0f0f0"};
            --glass-shadow: ${theme === "dark"
              ? "0 8px 32px 0 #1A133333, 0 2px 8px 0 #FFC72C11"
              : "0 8px 32px 0 #4E2A8422, 0 2px 8px 0 #FFC72C22"};
          }
          
          /* Existing styles */
          html, body, #root {
            overflow-x: hidden !important;
            background: var(--bg-primary);
            color: var(--text-primary);
            transition: background 0.5s, color 0.5s;
          }
          
          /* Typography theme adaptation */
          ${theme === "dark" ? `
            body {
              font-weight: 500; /* Slightly increased for dark mode */
              line-height: 1.65; /* 1.1x standard line height */
            }
          ` : `
            body {
              font-weight: 400;
              line-height: 1.5;
            }
          `}
          
          /* Glass card styling */
          .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(8px);
            border: var(--glass-border);
            box-shadow: var(--glass-shadow);
          }
          
          /* Existing scrollbar styling */
          ::-webkit-scrollbar {
            width: 10px;
            background: ${theme === "dark" ? "#2a1e4d" : "#f5e9c9"};
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #FFC72C 0%, #4E2A84 100%);
            border-radius: 8px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #FFD95E 0%, #4E2A84 100%);
          }
          html {
            scrollbar-color: #FFC72C ${theme === "dark" ? "#2a1e4d" : "#f5e9c9"};
            scrollbar-width: thin;
          }
          /* Make all purple text gold in dark mode */
          ${theme === "dark" ? `
            .text-purple-700, .text-purple-800, .text-purple-900,
            .text-[#4E2A84], .text-[#6C2EB7], .text-purple, .text-violet-700, .text-violet-800, .text-violet-900,
            .text-violet, .text-indigo-700, .text-indigo-800, .text-indigo-900,
            .text-indigo, .text-[#6C2EB7], .text-[#7C3AED], .text-[#8B5CF6], .text-[#A78BFA] {
              color: #FFC72C !important;
            }
            [style*="color: #4E2A84"], [style*="color:#4E2A84"],
            [style*="color: #6C2EB7"], [style*="color:#6C2EB7"],
            [style*="color: #7C3AED"], [style*="color:#7C3AED"],
            [style*="color: #8B5CF6"], [style*="color:#8B5CF6"],
            [style*="color: #A78BFA"], [style*="color:#A78BFA"] {
              color: #FFC72C !important;
            }
            .text-purple-700 a, .text-purple-800 a, .text-purple-900 a,
            .text-[#4E2A84] a, .text-[#6C2EB7] a, .text-purple a, .text-violet-700 a, .text-violet-800 a, .text-violet-900 a,
            .text-violet a, .text-indigo-700 a, .text-indigo-800 a, .text-indigo-900 a,
            .text-indigo a, .text-[#6C2EB7] a, .text-[#7C3AED] a, .text-[#8B5CF6] a, .text-[#A78BFA] a {
              color: #FFC72C !important;
            }
          ` : ""}
        `}</style>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;