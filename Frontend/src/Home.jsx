import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ThemeContext } from "./App";
import Countdown from "./components/Countdown"; // Import the simplified countdown component

// Set the event date to 18th April 2026 at 9:00 AM
const NASCON_DATE = new Date("2026-04-18T09:00:00");

function Gallery() {
  const images = [
    "/imgs/img1.png",
    "/imgs/img2.png",
    "/imgs/img3.png",
    "/imgs/img4.png",
    "/imgs/img5.png",
    "/imgs/img6.png",
    "/imgs/img7.jpg",
    "/imgs/img8.jpg",
    "/imgs/img9.jpg"
  ];
  const { theme } = React.useContext(ThemeContext);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="rounded-2xl overflow-hidden shadow-xl bg-white/50 backdrop-blur-lg border border-amber-100 aspect-video flex items-center justify-center transition-transform hover:scale-105 group"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ type: "spring", stiffness: 210, delay: i * 0.08 + 0.1 }}
        >
          <img
            src={src}
            alt={`Gallery ${i + 1}`}
            className="w-full h-full object-cover group-hover:opacity-90 transition duration-300"
            style={{ minHeight: 80, minWidth: "100%" }}
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
}

function EventStatistics() {
  const { theme } = React.useContext(ThemeContext);

  const stats = [
    { number: "70+", label: "Events" },
    { number: "5M+", label: "Raised" },
    { number: "3M+", label: "Prize Money" },
    { number: "80+", label: "Institutes" }
  ];

  return (
    <motion.section
      className="my-16 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-20">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
          >
            <motion.div
              className="text-5xl md:text-6xl font-fraunces font-black mb-1"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", bounce: 0.4 }}
            >
              {stat.number}
            </motion.div>
            <div
              className="text-base md:text-lg font-medium"
              style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function CategoryStrip() {
  const { theme } = React.useContext(ThemeContext);

  const categories = [
    "Computing",
    "Business",
    "Engineering",
    "Social",
    "Sports"
  ];

  const stripStyle = {
    background: theme === "dark"
      ? "linear-gradient(to right, #2a1e4d, #3A2A5D, #2a1e4d)"
      : "linear-gradient(to right, #4E2A84, #6C2EB7, #4E2A84)",
    boxShadow: theme === "dark"
      ? "0 4px 20px rgba(26, 19, 51, 0.6)"
      : "0 4px 20px rgba(78, 42, 132, 0.3)"
  };

  return (
    <motion.div
      className="w-full py-7 my-10 overflow-hidden"
      style={stripStyle}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-6 md:gap-16">
        {categories.map((category, i) => (
          <motion.div
            key={i}
            className="flex items-center font-fraunces text-xl md:text-2xl font-bold text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            {i >= 0 && <span className="text-amber-300 text-3xl mx-3">•</span>}
            {category}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Home() {
  const user = (() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      if (u && typeof u.name === "string" && typeof u.role === "string") {
        return u;
      }
    } catch {}
    return null;
  })();

  const { theme } = React.useContext(ThemeContext);

  return (
    <div className="pt-28 pb-6 px-4 max-w-5xl mx-auto relative">
      {/* Decorative blurred background shapes */}
      <div
        className="absolute top-20 -left-64 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: theme === "dark" ? "radial-gradient(circle at center, #4E2A84, #1A1333)" : "radial-gradient(circle at center, #FFC72C, #FFE9A3)",
          zIndex: -1
        }}
      />

      <div
        className="absolute top-96 -right-48 w-80 h-80 rounded-full opacity-30 blur-3xl"
        style={{
          background: theme === "dark" ? "radial-gradient(circle at center, #FFC72C, #4E2A84)" : "radial-gradient(circle at center, #4E2A84, #8F6DF2)",
          zIndex: -1
        }}
      />

      <div
        className="absolute bottom-40 -left-32 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{
          background: theme === "dark" ? "radial-gradient(circle at center, #009688, #1A1333)" : "radial-gradient(circle at center, #009688, #4ED8C9)",
          zIndex: -1
        }}
      />

      <motion.div
        className="glass-card backdrop-blur-2xl rounded-3xl shadow-2xl px-6 md:px-12 py-8 md:py-14 mb-11 relative overflow-hidden"
        style={{
          background: "var(--glass-bg)",
          border: "var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
          position: "relative"
        }}
        initial="from"
        whileInView="to"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
      >
        {/* Subtle decorative glow inside the hero card */}
        <div
          className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background: theme === "dark" ? "radial-gradient(circle at center, #FFC72C, transparent)" : "radial-gradient(circle at center, #4E2A84, transparent)",
            zIndex: 0
          }}
        />

        <motion.div
          className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-1"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.17 }}
        >
          {/* Content Column - Left-aligned text with centered countdown */}
          <motion.div
            className="flex-[3] w-full text-center md:text-left"
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.05, type: "spring" }}
          >
            <motion.h1
              className="font-fraunces text-4xl md:text-5xl font-extrabold mb-2"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              NaSCon 2025
            </motion.h1>
            
            <motion.div 
              className="w-24 h-1 mb-6 md:mx-0 mx-auto"
              style={{ 
                background: theme === "dark" ? "#FFC72C" : "#4E2A84",
                borderRadius: "1px"
              }}
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            
            <motion.p
              className="text-lg md:text-xl font-inter mb-4 drop-shadow font-bold max-w-xl mx-auto md:mx-0"
              style={{
                color: theme === "dark" ? "#FFC72C" : "#4E2A84"
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.96, y: 0 }}
              transition={{ delay: 0.21 }}
            >
              Pakistan's Premier Tech & Cultural Event
            </motion.p>
            
            {/* Only the countdown itself is centered */}
            <div className="flex justify-center md:justify-start">
              <Countdown targetDate={NASCON_DATE} />
            </div>
            
            <motion.p
              className="text-base md:text-lg font-inter mb-6 max-w-xl mx-auto md:mx-0"
              style={{
                color: theme === "dark" ? "#f5e9c9" : "#18122b"
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
            >
              Join us for a celebration of innovation, tech, culture, and competition.
              Discover events in Computing, Business, Engineering, Literature, and much more!
            </motion.p>
            
            <AnimatePresence mode="wait">
              {user && user.name && user.role ? (
                <motion.div initial={{ scale: 0.9, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Link to="/dashboard">
                    <motion.button
                      className="px-7 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
                      whileHover={{ scale: 1.05, y: -2, boxShadow: "0 4px 40px #FFC72C51" }}
                      whileTap={{ scale: 0.99 }}
                    >
                      Dashboard
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <Link to="/login">
                    <motion.button
                      className="px-7 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
                      whileHover={{ scale: 1.08, y: -2, boxShadow: "0 4px 32px #4E2A8433" }}
                      whileTap={{ scale: 0.991 }}
                    >
                      Login / Register
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Logo Column - Positioned equidistantly from text and right edge */}
          <motion.div
            className="flex-1 flex items-center justify-end pr-8 md:pr-12 pt-8 md:pt-0"
            initial={{ opacity: 0, scale: 0.82, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            <div className="flex items-center justify-center">
              <Logo size={200} style={{
                boxShadow: "0 0 44px 6px #FFC72C33",
                borderRadius: "50%",
                marginBottom: 0
              }} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="mb-16 relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: theme === "dark"
            ? "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\"%3E%3Cpath d=\"M15 0L0 15V0H15ZM30 0L0 30V20L20 0H30ZM45 0L0 45V35L35 0H45ZM60 0L0 60V50L50 0H60ZM0 0H10L0 10V0Z\" fill=\"%23FFC72C\" /%3E%3C/svg%3E')"
            : "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 60 60\"%3E%3Cpath d=\"M15 0L0 15V0H15ZM30 0L0 30V20L20 0H30ZM45 0L0 45V35L35 0H45ZM60 0L0 60V50L50 0H60ZM0 0H10L0 10V0Z\" fill=\"%234E2A84\" /%3E%3C/svg%3E')",
          backgroundSize: "60px 60px",
          zIndex: -1
        }}/>

        <motion.h2
          className="font-fraunces text-3xl md:text-4xl font-bold mb-4 text-center"
          style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
        >
          Event Gallery
        </motion.h2>

        <motion.div
          className="w-20 h-1 mx-auto mb-8"
          style={{
            background: theme === "dark" ? "#FFC72C" : "#4E2A84",
            borderRadius: "1px"
          }}
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
        />

        <Gallery />
      </motion.div>

      <div className="relative">
        <div
          className="absolute inset-0 rounded-3xl opacity-20 blur-lg"
          style={{
            background: theme === "dark"
              ? "linear-gradient(135deg, rgba(42, 30, 77, 0.5), rgba(26, 19, 51, 0.5))"
              : "linear-gradient(135deg, rgba(250, 249, 246, 0.8), rgba(255, 248, 225, 0.8))",
            zIndex: -1
          }}
        />
        <EventStatistics />
      </div>

      <CategoryStrip />

      <motion.div
        className="mt-12 mb-4 glass-card rounded-2xl px-8 py-10 relative overflow-hidden"
        style={{
          background: "var(--glass-bg)",
          border: "var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
          position: "relative",
          minHeight: "180px"
        }}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30 blur-2xl"
          style={{
            background: theme === "dark" ? "radial-gradient(circle at center, #FFC72C, transparent)" : "radial-gradient(circle at center, #4E2A84, transparent)",
            zIndex: 0
          }}
        />

        <div className="relative z-1">
          <motion.h2
            className="font-fraunces text-2xl font-bold mb-3 flex items-center gap-2"
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg width={18} height={18}><circle cx={9} cy={9} r={8} fill={theme === "dark" ? "#FFC72C" : "#4E2A84"} /></svg>
            About NaSCon
          </motion.h2>

          <motion.div
            className="w-16 h-0.5 mb-6"
            style={{
              background: theme === "dark" ? "#FFC72C" : "#4E2A84",
              borderRadius: "1px",
              opacity: 0.7
            }}
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />

          <motion.p
            className="text-base md:text-lg font-inter leading-relaxed"
            style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            NaSCon is the annual flagship event hosted by FAST-NUCES Islamabad, connecting brilliant students from across Pakistan.
            Compete, collaborate, and celebrate with a wide range of competitions, workshops, and cultural marvels. Experience the fusion of innovation, knowledge, leadership, and Pakistani spirit at NaSCon!
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;