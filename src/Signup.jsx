import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000";

function LoginSignup() {
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
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Backend-integrated login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        let data;
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        setError(""); // toast replaces error display
        toast.error(data.error || data.message || `Login failed (HTTP ${res.status})`);
      } else {
        const data = await res.json();
        setSuccessMsg(""); // toast replaces success display
        toast.success("Login successful!");
        localStorage.setItem("token", data.token); // Store the token in localStorage
        try {
          const userRes = await fetch(`${API_URL}/user/by-email?email=${encodeURIComponent(loginData.email)}`);
          if (userRes.ok) {
            const userInfo = await userRes.json();
            localStorage.setItem("user", JSON.stringify({ name: userInfo.name, role: userInfo.role }));
          } else {
            localStorage.setItem("user", JSON.stringify({ name: loginData.email, role: data.role || "student" }));
          }
        } catch {
          localStorage.setItem("user", JSON.stringify({ name: loginData.email, role: data.role || "student" }));
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setError(""); // toast replaces error display
      toast.error("Network error: Could not connect to backend.");
    }
    setLoading(false);
  };

  // Backend-integrated signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      if (!res.ok) {
        let data;
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        setError(""); // toast replaces error display
        toast.error(data.message || `Signup failed (HTTP ${res.status})`);
      } else {
        setSuccessMsg(""); // toast replaces success display
        toast.success("Signup successful! You may now login.");
        setTab("login");
      }
    } catch (err) {
      setError(""); // toast replaces error display
      toast.error("Network error: Could not connect to backend.");
    }
    setLoading(false);
  };

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 40, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.7, bounce: 0.22 } },
    exit: { opacity: 0, y: -40, scale: 0.98, transition: { duration: 0.3 } },
  };
  const tabVariants = {
    initial: { opacity: 0, x: tab === "login" ? 40 : -40 },
    animate: { opacity: 1, x: 0, transition: { type: "spring", duration: 0.5 } },
    exit: { opacity: 0, x: tab === "login" ? -40 : 40, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-inter">
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={cardVariants}
      >
        <motion.div
          className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-amber-100 relative overflow-hidden"
          style={{
            boxShadow: "0 8px 40px 0 #FFC72C22, 0 2px 8px 0 #4E2A8422",
          }}
          whileHover={{ scale: 1.012, boxShadow: "0 12px 48px 0 #FFC72C33, 0 4px 16px 0 #4E2A8433" }}
        >
          <motion.div
            className="absolute left-0 top-0 w-full h-1/3 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #fff8 10%, #fff2 60%, transparent 100%)" }}
            initial={{ opacity: 0.25, y: -30 }}
            animate={{ opacity: [0.25, 0.4, 0.25], y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <div className="flex justify-center mb-6">
            <Logo size={48} />
          </div>
          <div className="flex mb-6 relative">
            <motion.button
              className={`flex-1 py-2 font-bold rounded-l-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                tab === "login"
                  ? "bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow"
                  : "bg-white text-purple-900 border border-purple-200"
              }`}
              onClick={() => { setTab("login"); setError(""); setSuccessMsg(""); }}
              disabled={tab === "login"}
              whileTap={{ scale: 0.97 }}
            >
              Login
            </motion.button>
            <motion.button
              className={`flex-1 py-2 font-bold rounded-r-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                tab === "signup"
                  ? "bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow"
                  : "bg-white text-purple-200 border border-purple-900"
              }`}
              onClick={() => { setTab("signup"); setError(""); setSuccessMsg(""); }}
              disabled={tab === "signup"}
              whileTap={{ scale: 0.97 }}
            >
              Signup
            </motion.button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.25 }, layout: { type: "spring", bounce: 0.22, duration: 0.5 } }}
              style={{ overflow: "hidden" }}
            >
              {tab === "login" ? (
                <motion.form
                  key="login"
                  onSubmit={handleLogin}
                  className="space-y-4"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div>
                    <label className="block text-purple-900 font-semibold mb-1" htmlFor="login-email">
                      Email
                    </label>
                    <motion.input
                      id="login-email"
                      type="email"
                      className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      autoComplete="username"
                      whileFocus={{ scale: 1.03, borderColor: "#FFC72C" }}
                    />
                  </div>
                  <div>
                    <label className="block text-purple-900 font-semibold mb-1" htmlFor="login-password">
                      Password
                    </label>
                    <motion.input
                      id="login-password"
                      type="password"
                      className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      autoComplete="current-password"
                      whileFocus={{ scale: 1.03, borderColor: "#FFC72C" }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-900 to-amber-400 text-white font-bold py-2 rounded-lg shadow hover:scale-105 transition-all"
                    disabled={loading}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 24px #FFC72C44" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  onSubmit={handleSignup}
                  className="space-y-4"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div>
                    <label className="block text-purple-900 font-semibold mb-1" htmlFor="signup-name">
                      Name
                    </label>
                    <motion.input
                      id="signup-name"
                      type="text"
                      className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                      autoComplete="name"
                      whileFocus={{ scale: 1.03, borderColor: "#FFC72C" }}
                    />
                  </div>
                  <div>
                    <label className="block text-purple-900 font-semibold mb-1" htmlFor="signup-email">
                      Email
                    </label>
                    <motion.input
                      id="signup-email"
                      type="email"
                      className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      autoComplete="username"
                      whileFocus={{ scale: 1.03, borderColor: "#FFC72C" }}
                    />
                  </div>
                  <div>
                    <label className="block text-purple-900 font-semibold mb-1" htmlFor="signup-password">
                      Password
                    </label>
                    <motion.input
                      id="signup-password"
                      type="password"
                      className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      autoComplete="new-password"
                      whileFocus={{ scale: 1.03, borderColor: "#FFC72C" }}
                    />
                  </div>
                  <div>
                    <label className="block text-purple-900 font-semibold mb-1" htmlFor="signup-contact">
                      Contact
                    </label>
                    <motion.input
                      id="signup-contact"
                      type="text"
                      className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                      value={signupData.contact}
                      onChange={(e) => setSignupData({ ...signupData, contact: e.target.value })}
                      required
                      autoComplete="tel"
                      whileFocus={{ scale: 1.03, borderColor: "#FFC72C" }}
                    />
                  </div>
                  <div>
                    <label className="block text-purple-900 font-semibold mb-1" htmlFor="signup-role">
                      Role
                    </label>
                    <motion.select
                      id="signup-role"
                      className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                      value={signupData.role}
                      onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                      required
                      whileFocus={{ scale: 1.03, borderColor: "#FFC72C" }}
                    >
                      <option value="student">Student</option>
                      <option value="organizer">Organizer</option>
                      <option value="sponsor">Sponsor</option>
                      {/* <option value="admin" disabled>Admin</option> */}
                    </motion.select>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-purple-900 text-white font-bold py-2 rounded-lg shadow hover:scale-105 transition-all"
                    disabled={loading}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 24px #FFC72C44" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? "Signing up..." : "Signup"}
                  </motion.button>
                </motion.form>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginSignup;