import React from "react";

function SacredPattern() {
  return (
    <svg
      className="fixed left-0 top-0 w-full h-full z-0 pointer-events-none"
      style={{
        opacity: 0.07,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <defs>
        <pattern
          id="geo"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(-12, 0)"
        >
          <circle cx="60" cy="60" r="56" stroke="#4E2A84" strokeWidth="2" fill="none" />
          <circle cx="60" cy="60" r="36" stroke="#FFC72C" strokeWidth="1.5" fill="none" />
          <polygon points="60,8 112,112 8,112" stroke="#009688" strokeWidth="1.2" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
  );
}

export default SacredPattern;
