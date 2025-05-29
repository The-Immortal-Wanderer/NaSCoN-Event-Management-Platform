import React, { useMemo } from "react";
import { motion } from "framer-motion";

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const size = 16 + Math.random() * 32;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const color = ["#FFC72C", "#4E2A84", "#009688", "#FF7F50"][i % 4];
        const opacity = 0.06 + Math.random() * 0.09; // Even fainter than before
        const duration = 6 + Math.random() * 6;
        const delay = Math.random() * 4;
        return { size, x, y, color, opacity, duration, delay };
      }),
    []
  );

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        filter: "blur(2.5px)",
        opacity: 0.38, // Even fainter than before (was 0.55)
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      {particles.map((p, i) => (
        <motion.circle
          key={i}
          cx={`${p.x}%`}
          r={p.size}
          fill={p.color}
          opacity={p.opacity}
          initial={{ cy: `${p.y}%` }}
          animate={{
            cy: [`${p.y}%`, `${100 - p.y}%`, `${p.y}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </svg>
  );
}

export default Particles;
