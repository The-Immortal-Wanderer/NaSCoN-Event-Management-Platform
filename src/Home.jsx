import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// Set the event date to 18th April 2026 at 9:00 AM
const NASCON_DATE = new Date("2026-04-18T09:00:00");

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return timeLeft;
}

function getTimeLeft(target) {
  const now = new Date();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, finished: diff <= 0 };
}

// Improved FlipSegment with GSAP and visually matching the attached image
function FlipSegment({ value, label }) {
  const [displayVal, setDisplayVal] = useState(value);
  const ref = useRef();

  useEffect(() => {
    if (displayVal !== value) {
      gsap.fromTo(
        ref.current,
        { rotateX: 90, opacity: 0.2 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
      setDisplayVal(value);
    }
  }, [value, displayVal]);

  return (
    <div className="flex flex-col items-center w-20 md:w-24 select-none">
      <div
        ref={ref}
        className="rounded-[22px] md:rounded-[28px] shadow-lg font-extrabold text-3xl md:text-4xl w-full py-4 mb-1 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #FFC72C 0%, #bfa3e2 100%)",
          color: "#fff",
          fontFamily: "Inter, Fraunces, sans-serif",
          fontWeight: 800,
          letterSpacing: "0.01em",
          fontVariantNumeric: "tabular-nums",
          boxShadow: "0 4px 24px #4E2A8422, 0 1.5px 6px #FFC72C33",
          border: "none",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-sm md:text-base font-bold text-purple-700 tracking-wide mt-1">{label}</span>
    </div>
  );
}

// Improved Countdown with pulse and GSAP
function Countdown() {
  const { days, hours, minutes, seconds, finished } = useCountdown(NASCON_DATE);
  const pulseRef = useRef();

  // Pulse effect on every second
  useEffect(() => {
    if (pulseRef.current) {
      gsap.fromTo(
        pulseRef.current,
        { scale: 1 },
        { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }
  }, [seconds]);

  // Custom celebratory effect (animated emoji burst) instead of confetti
  useEffect(() => {
    if (!finished) return;
    // Animate a burst of emojis at the top of the page
    const burst = document.createElement("div");
    burst.style.position = "fixed";
    burst.style.top = "10vh";
    burst.style.left = "50%";
    burst.style.transform = "translateX(-50%)";
    burst.style.zIndex = 9999;
    burst.style.pointerEvents = "none";
    burst.style.fontSize = "2.5rem";
    burst.style.fontWeight = "bold";
    burst.style.transition = "opacity 1.2s";
    burst.innerHTML = Array.from({ length: 18 })
      .map(
        (_, i) =>
          `<span style="display:inline-block;transform:translateY(0) scale(1);animation:emoji-burst 1.2s cubic-bezier(.2,.8,.2,1) ${i *
            0.05}s 1 both;">🎉</span>`
      )
      .join("");
    document.body.appendChild(burst);

    // Add keyframes for the burst effect
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes emoji-burst {
        0% { opacity: 0; transform: translateY(0) scale(0.7) rotate(-10deg);}
        30% { opacity: 1; }
        60% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-120px) scale(1.3) rotate(20deg);}
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      burst.style.opacity = "0";
      setTimeout(() => {
        burst.remove();
        style.remove();
      }, 1200);
    }, 1200);

    // Cleanup
    return () => {
      burst.remove();
      style.remove();
    };
  }, [finished]);

  // Set the height to match the digit box (py-4 on digits = 4*2*4px = 32px + font size + border, so ~64px)
  // Use flex and min-h for perfect vertical alignment
  const digitBoxHeight = "64px"; // Adjust if you change digit box padding/font size

  return (
    <div
      ref={pulseRef}
      className="flex gap-2 md:gap-6 justify-center items-center mt-2 mb-8"
      style={{ minHeight: digitBoxHeight }}
    >
      {finished ? (
        <motion.div
          className="text-3xl md:text-4xl font-fraunces font-extrabold text-[#FFC72C] drop-shadow-glow border border-amber-400 px-6 py-2 rounded-xl glass-morphism"
          initial={{ scale: 0.7, y: 24 }}
          animate={{ scale: 1, y: 0, rotateZ: [2, -7, 3, -5, 1, 0] }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >NaSCon is Live Now!</motion.div>
      ) : (
        <>
          <FlipSegment value={days} label="Days" />
          <span
            className="flex items-center justify-center font-extrabold"
            style={{
              fontSize: "2.5rem",
              color: "#bfa3e2",
              minHeight: digitBoxHeight,
              height: digitBoxHeight,
              lineHeight: digitBoxHeight,
              margin: "0 0.5rem",
              fontWeight: 800,
              userSelect: "none",
            }}
          >:</span>
          <FlipSegment value={hours} label="Hours" />
          <span
            className="flex items-center justify-center font-extrabold"
            style={{
              fontSize: "2.5rem",
              color: "#bfa3e2",
              minHeight: digitBoxHeight,
              height: digitBoxHeight,
              lineHeight: digitBoxHeight,
              margin: "0 0.5rem",
              fontWeight: 800,
              userSelect: "none",
            }}
          >:</span>
          <FlipSegment value={minutes} label="Minutes" />
          <span
            className="flex items-center justify-center font-extrabold"
            style={{
              fontSize: "2.5rem",
              color: "#bfa3e2",
              minHeight: digitBoxHeight,
              height: digitBoxHeight,
              lineHeight: digitBoxHeight,
              margin: "0 0.5rem",
              fontWeight: 800,
              userSelect: "none",
            }}
          >:</span>
          <FlipSegment value={seconds} label="Seconds" />
        </>
      )}
    </div>
  );
}

function Gallery() {
  // Replace with your actual images
  const images = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
  ];
  // Animate image entrance
  return (
    <section className="mt-12 mb-8 relative">
      <h2 className="font-fraunces text-xl md:text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
        <svg width={22} height={22}><circle cx={11} cy={11} r={10} fill="#FFD95E" /><circle cx={11} cy={11} r={5} fill="#FFD95E70" /></svg>Event Gallery
      </h2>
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
    </section>
  );
}

function Home() {
  // Always get user info from localStorage, which is set at login time
  const user = (() => {
    try {
      const u = JSON.parse(localStorage.getItem("user"));
      // Only return if both name and role are present
      if (u && typeof u.name === "string" && typeof u.role === "string") {
        return u;
      }
    } catch {}
    return null;
  })();

  // Hero animations
  return (
    <div className="pt-28 pb-14 px-4 max-w-5xl mx-auto">
      <motion.div
        className="glass-morphism bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-amber-100 px-6 md:px-12 py-8 md:py-14 mb-11"
        style={{
          boxShadow: "0 8px 44px 0 #FFC72C28, 0 2px 12px 0 #4E2A8420",
          position: "relative"
        }}
        initial="from"
        whileInView="to"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
      >
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 md:gap-14"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.17 }}
        >
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.05, type: "spring" }}
          >
            <motion.h1
              className="font-fraunces text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 drop-shadow-glow mb-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              NaSCon 2025
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-purple-900 font-inter mb-4 drop-shadow font-bold"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.96, y: 0 }}
              transition={{ delay: 0.21 }}
            >
              Pakistan's Premier Tech & Cultural Event
            </motion.p>
            <Countdown />
            <motion.p
              className="text-base md:text-lg text-gray-700 font-inter mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
            >
              Join us for a celebration of innovation, tech, culture, and competition.
              Discover events in Computing, Business, Engineering, Literature, and much more!
            </motion.p>
            <AnimatePresence mode="wait">
              {/* Always show Dashboard button if user is logged in */}
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
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.82, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            <Logo size={168} style={{
              boxShadow: "0 0 44px 6px #FFC72C33",
              borderRadius: "50%",
              marginBottom: 0
            }} />
          </motion.div>
        </motion.div>
      </motion.div>
      <Gallery />
      <motion.div
        className="mt-12 mb-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-amber-100 px-6 py-8"
        style={{
          boxShadow: "0 8px 24px 0 #FFC72C33, 0 2px 12px 0 #4E2A8433",
          position: "relative"
        }}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.48, type: "spring", bounce: 0.12 }}
      >
        <h2 className="font-fraunces text-2xl font-bold text-purple-900 mb-3 flex items-center gap-2">
          <svg width={18} height={18}><circle cx={9} cy={9} r={8} fill="#4E2A84" /></svg>
          About NaSCon
        </h2>
        <p className="text-base md:text-lg text-gray-700 font-inter">
          NaSCon is the annual flagship event hosted by FAST-NUCES Islamabad, connecting brilliant students from across Pakistan.
          Compete, collaborate, and celebrate with a wide range of competitions, workshops, and cultural marvels. Experience the fusion of innovation, knowledge, leadership, and Pakistani spirit at NaSCon!
        </p>
      </motion.div>
    </div>
  );
}

export default Home;