import React from "react";
import { motion } from "framer-motion";

/**
 * NaSCon Logo SVG (animated, matches site theme)
 * @param {object} props
 * @param {number} [props.size=64] - width/height in px
 * @param {string} [props.className] - additional classes
 * @param {object} [props.style] - style overrides
 */
function Logo({ size = 64, className = "", style = {} }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`mx-auto ${className}`}
      style={style}
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, 8, -8, 0] }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    >
      <circle cx="32" cy="32" r="30" fill="#FFC72C" />
      <path d="M32 12 L52 52 L12 52 Z" fill="#4E2A84" />
    </motion.svg>
  );
}

export default Logo;
