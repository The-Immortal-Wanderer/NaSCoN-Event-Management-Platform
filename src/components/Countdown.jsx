import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ThemeContext } from "../App";

// Hook to calculate time left
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  
  return timeLeft;
}

// Helper function to get time left
function getTimeLeft(target) {
  const now = new Date();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, finished: diff <= 0 };
}

// Simplified 3D Digit with CSS transforms
function DigitBlock({ value, label, index }) {
  const prevValueRef = useRef(value);
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  
  // Colors based on theme
  const blockColor = theme === 'dark' ? '#18122B' : '#4E2A84';
  const textColor = '#FFFFFF';
  const labelColor = theme === 'dark' ? '#FFC72C' : '#4E2A84';
  const glowColor = theme === 'dark' ? 'rgba(255, 199, 44, 0.2)' : 'rgba(78, 42, 132, 0.2)';
  
  // Apply floating animation on mount
  useEffect(() => {
    gsap.to(containerRef.current, {
      y: "+=5",
      duration: 2 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [index]);
  
  // Handle value changes
  useEffect(() => {
    // Only animate if the value has changed
    if (value !== prevValueRef.current && !isFlipping) {
      setIsFlipping(true);
      
      // Set up the animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFlipping(false);
          prevValueRef.current = value;
        }
      });
      
      // First half of flip: show back face with new value
      tl.to(containerRef.current, {
        rotateX: "90deg",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setDisplayValue(value)
      });
      
      // Second half of flip: continue rotation to front face
      tl.to(containerRef.current, {
        rotateX: "0deg",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [value, isFlipping]);
  
  return (
    <div className="flex flex-col items-center">
      <div style={{ height: "90px", perspective: "1000px", width: "72px" }}>
        {/* 3D Container */}
        <div 
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: "rotateX(0deg)"
          }}
        >
          {/* Front face with current value */}
          <div
            ref={frontRef}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              backgroundColor: blockColor,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: textColor,
              fontSize: "2.25rem",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
              boxShadow: `0 4px 20px ${glowColor}, 0 2px 8px rgba(0, 0, 0, 0.1)`,
              border: theme === 'dark' ? '1px solid rgba(255, 199, 44, 0.15)' : 'none'
            }}
          >
            {String(displayValue).padStart(2, '0')}
          </div>
          
          {/* Back face */}
          <div
            ref={backRef}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              backgroundColor: blockColor,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: textColor,
              fontSize: "2.25rem",
              fontWeight: "700",
              fontVariantNumeric: "tabular-nums",
              transform: "rotateX(180deg)",
              boxShadow: `0 4px 20px ${glowColor}, 0 2px 8px rgba(0, 0, 0, 0.1)`,
              border: theme === 'dark' ? '1px solid rgba(255, 199, 44, 0.15)' : 'none'
            }}
          >
            {String(prevValueRef.current).padStart(2, '0')}
          </div>
        </div>
      </div>
      
      {/* Label */}
      <span 
        className="text-sm font-bold mt-2"
        style={{ color: labelColor }}
      >
        {label}
      </span>
    </div>
  );
}

// Separator dots
function Separator({ pulsing = true }) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="flex flex-col items-center justify-center h-20 mx-1">
      <motion.div
        animate={pulsing ? {
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: theme === "dark" ? "#FFC72C" : "#4E2A84",
          borderRadius: "50%",
          marginBottom: "12px"
        }}
      />
      <motion.div
        animate={pulsing ? {
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: theme === "dark" ? "#FFC72C" : "#4E2A84",
          borderRadius: "50%"
        }}
      />
    </div>
  );
}

// Main Countdown component
export default function Countdown({ targetDate }) {
  const { days, hours, minutes, seconds, finished } = useCountdown(targetDate);
  const { theme } = useContext(ThemeContext);

  if (finished) {
    return (
      <motion.div
        className="text-3xl md:text-4xl font-fraunces font-extrabold px-6 py-3 rounded-xl"
        style={{
          color: theme === "dark" ? "#FFC72C" : "#4E2A84",
          border: `2px solid ${theme === "dark" ? "#FFC72C" : "#4E2A84"}`,
          background: theme === "dark" ? "rgba(26, 19, 51, 0.8)" : "rgba(255, 255, 255, 0.8)",
        }}
        initial={{ scale: 0.7, y: 24 }}
        animate={{ scale: 1, y: 0, rotateZ: [2, -7, 3, -5, 1, 0] }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        NaSCon is Live Now!
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="flex justify-center items-center gap-1 md:gap-2 my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <DigitBlock value={days} label="Days" index={0} />
      <Separator />
      <DigitBlock value={hours} label="Hours" index={1} />
      <Separator />
      <DigitBlock value={minutes} label="Mins" index={2} />
      <Separator />
      <DigitBlock value={seconds} label="Secs" index={3} />
    </motion.div>
  );
}
