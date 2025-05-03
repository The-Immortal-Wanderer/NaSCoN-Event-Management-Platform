import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { toast } from "react-toastify";
import { ThemeContext } from "./App";

const API_URL = "http://localhost:3000";

function LoginSignup() {
  const { theme } = useContext(ThemeContext);
  const [tab, setTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Login failed");
      } else {
        const data = await res.json();
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        
        // Get user information and store it in localStorage
        try {
          const userRes = await fetch(`${API_URL}/user/by-email?email=${encodeURIComponent(loginData.email)}`, {
            headers: { Authorization: `Bearer ${data.token}` }
          });
          
          if (userRes.ok) {
            const userInfo = await userRes.json();
            localStorage.setItem("user", JSON.stringify({ name: userInfo.name, role: userInfo.role }));
          } else {
            // Fallback to using the role from login response
            localStorage.setItem("user", JSON.stringify({ 
              name: loginData.email, 
              role: data.role || "student" 
            }));
          }
        } catch (error) {
          // If user fetch fails, use email and role from login response
          localStorage.setItem("user", JSON.stringify({ 
            name: loginData.email, 
            role: data.role || "student" 
          }));
        }
        
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Network error: Could not connect to backend.");
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Signup failed");
      } else {
        toast.success("Signup successful! You may now login.");
        setTab("login");
      }
    } catch (err) {
      toast.error("Network error: Could not connect to backend.");
    }
    setLoading(false);
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
  
  const buttonGradient = tab === "login" 
    ? "from-purple-900 to-amber-400"
    : "from-amber-400 to-purple-900";

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen flex items-center justify-center font-inter">
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="glass-card backdrop-blur-xl rounded-xl shadow-xl border overflow-hidden"
          style={{
            background: theme === "dark" ? "rgba(26, 19, 51, 0.85)" : "rgba(255, 255, 255, 0.7)",
            borderColor: theme === "dark" ? "rgba(58, 42, 93, 0.6)" : "rgba(229, 229, 229, 0.8)",
            boxShadow: theme === "dark" 
              ? "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
              : "0 8px 32px 0 rgba(78, 42, 132, 0.1)"
          }}
          whileHover={{ 
            boxShadow: theme === "dark" 
              ? "0 8px 38px 0 rgba(255, 199, 44, 0.15)" 
              : "0 8px 38px 0 rgba(78, 42, 132, 0.2)" 
          }}
        >
          <div
            className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{
              background: theme === "dark" 
                ? "radial-gradient(circle at center, #FFC72C, transparent)" 
                : "radial-gradient(circle at center, #4E2A84, transparent)",
              zIndex: 0
            }}
          />

          <div className="flex justify-center pt-8 pb-4">
            <Logo size={60} />
          </div>
          
          <div className="flex mb-6 mx-4">
            <button
              className={`flex-1 py-3 px-4 font-bold rounded-l-lg transition-all ${
                tab === "login"
                  ? `bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-md`
                  : theme === "dark" ? "bg-[#2A1E4D] text-[#f5e9c9]" : "bg-white text-[#4E2A84]"
              }`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 px-4 font-bold rounded-r-lg transition-all ${
                tab === "signup"
                  ? `bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow-md`
                  : theme === "dark" ? "bg-[#2A1E4D] text-[#f5e9c9]" : "bg-white text-[#4E2A84]"
              }`}
              onClick={() => setTab("signup")}
            >
              Signup
            </button>
          </div>
          
          <div className="px-8 pb-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tab === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label 
                        className="block font-medium mb-2"
                        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                      >
                        Email
                      </label>
                      <motion.input
                        type="email"
                        style={inputStyle}
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        placeholder="Your email"
                        whileFocus={{ 
                          scale: 1.01, 
                          borderColor: theme === "dark" ? "#FFC72C" : "#4E2A84" 
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        className="block font-medium mb-2"
                        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                      >
                        Password
                      </label>
                      <motion.input
                        type="password"
                        style={inputStyle}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        whileFocus={{ 
                          scale: 1.01, 
                          borderColor: theme === "dark" ? "#FFC72C" : "#4E2A84" 
                        }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className={`w-full bg-gradient-to-r ${buttonGradient} text-white font-bold py-3 mt-3 rounded-lg shadow hover:scale-105 transition-all`}
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(255, 199, 44, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </motion.button>
                  </form>
                ) : (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label 
                        className="block font-medium mb-2"
                        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                      >
                        Name
                      </label>
                      <motion.input
                        type="text"
                        style={inputStyle}
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                        placeholder="Your full name"
                        whileFocus={{ 
                          scale: 1.01, 
                          borderColor: theme === "dark" ? "#FFC72C" : "#4E2A84" 
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        className="block font-medium mb-2"
                        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                      >
                        Email
                      </label>
                      <motion.input
                        type="email"
                        style={inputStyle}
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                        placeholder="Your email"
                        whileFocus={{ 
                          scale: 1.01, 
                          borderColor: theme === "dark" ? "#FFC72C" : "#4E2A84" 
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        className="block font-medium mb-2"
                        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                      >
                        Password
                      </label>
                      <motion.input
                        type="password"
                        style={inputStyle}
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        whileFocus={{ 
                          scale: 1.01, 
                          borderColor: theme === "dark" ? "#FFC72C" : "#4E2A84" 
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        className="block font-medium mb-2"
                        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                      >
                        Contact
                      </label>
                      <motion.input
                        type="text"
                        style={inputStyle}
                        value={signupData.contact}
                        onChange={(e) => setSignupData({ ...signupData, contact: e.target.value })}
                        required
                        placeholder="Phone number"
                        whileFocus={{ 
                          scale: 1.01, 
                          borderColor: theme === "dark" ? "#FFC72C" : "#4E2A84" 
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        className="block font-medium mb-2"
                        style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                      >
                        Role
                      </label>
                      <motion.select
                        style={inputStyle}
                        value={signupData.role}
                        onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                        required
                        whileFocus={{ 
                          scale: 1.01, 
                          borderColor: theme === "dark" ? "#FFC72C" : "#4E2A84" 
                        }}
                      >
                        <option value="student">Student</option>
                        <option value="organizer">Organizer</option>
                        <option value="sponsor">Sponsor</option>
                      </motion.select>
                    </div>
                    <motion.button
                      type="submit"
                      className={`w-full bg-gradient-to-r ${buttonGradient} text-white font-bold py-3 mt-3 rounded-lg shadow hover:scale-105 transition-all`}
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(78, 42, 132, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Signup"}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginSignup;