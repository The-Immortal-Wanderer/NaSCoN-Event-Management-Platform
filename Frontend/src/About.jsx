import React, { useContext, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ThemeContext } from "./App";
import Logo from "./Logo";

function About() {
  const { theme } = useContext(ThemeContext);
  
  // References for scroll-triggered animations
  const aboutRef = useRef(null);
  const designRef = useRef(null);
  const colorRef = useRef(null);
  const componentRef = useRef(null);
  const techRef = useRef(null);
  
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const designInView = useInView(designRef, { once: true, margin: "-100px" });
  const colorInView = useInView(colorRef, { once: true, margin: "-100px" });
  const componentInView = useInView(componentRef, { once: true, margin: "-100px" });
  const techInView = useInView(techRef, { once: true, margin: "-100px" });

  return (
    <div className="pt-28 pb-6 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Logo size={100} className="mx-auto mb-6" />
            <motion.h1
              className="font-fraunces text-5xl md:text-6xl font-extrabold mb-6"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About NaSCon
            </motion.h1>
          </motion.div>

          <motion.div
            className="w-32 h-1 mx-auto mb-8"
            style={{ 
              background: theme === "dark" ? "#FFC72C" : "#4E2A84",
              borderRadius: "1px"
            }}
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.div 
            className="glass-card p-8 md:p-10 rounded-2xl mb-16"
            style={{ 
              minHeight: "220px" // Ensure card maintains consistent height across themes
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p 
              className="text-lg md:text-xl font-inter leading-relaxed"
              style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
            >
              NaSCon is the annual flagship event hosted by FAST-NUCES Islamabad, connecting brilliant students from across Pakistan.
              Established with a vision to showcase talent and foster innovation, NaSCon has grown into Pakistan's premier technical and cultural festival.
              The event brings together participants from over 80 institutes nationwide, featuring competitions in Computing, Business, Engineering, Literature, and more.
              With more than 70 diverse events, over 5 million rupees raised, and 3 million in prize money, NaSCon represents the fusion of 
              technology, culture, leadership, and the Pakistani spirit of excellence and creativity.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Design Vision & Identity Section */}
      <div 
        ref={designRef}
        className="max-w-5xl mx-auto px-4 mb-20"
      >
        <motion.h2 
          className="font-fraunces text-3xl md:text-4xl font-bold mb-6 text-center"
          style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          initial={{ opacity: 0 }}
          animate={designInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Design Vision & Identity
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={designInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-card p-6 rounded-xl">
            <h3 
              className="font-fraunces text-xl font-bold mb-4 flex items-center"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              <svg className="mr-2" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke={theme === "dark" ? "#FFC72C" : "#4E2A84"} strokeWidth="2" />
                <circle cx="12" cy="12" r="5" fill={theme === "dark" ? "#FFC72C50" : "#4E2A8450"} />
              </svg>
              Core Concept
            </h3>
            <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              "Digital Elegance with Cultural Roots" - The NaSCon platform blends cutting-edge digital aesthetics with cultural heritage elements, 
              creating a distinctive identity that celebrates both innovation and tradition through a sophisticated layering system that creates depth 
              while maintaining exceptional usability.
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 
              className="font-fraunces text-xl font-bold mb-4 flex items-center"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              <svg className="mr-2" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke={theme === "dark" ? "#FFC72C" : "#4E2A84"} strokeWidth="2" />
                <circle cx="12" cy="12" r="5" fill={theme === "dark" ? "#FFC72C50" : "#4E2A8450"} />
              </svg>
              Brand Expression
            </h3>
            <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              The visual language incorporates a modern interpretation of traditional Pakistani patterns, particularly focusing on sacred geometry 
              and flowing organic forms inspired by the NaSCon tree logo. These elements are subtly woven throughout the interface as decorative 
              accents, creating a cohesive and culturally resonant experience.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Color System & Typography Section */}
      <div 
        ref={colorRef}
        className="w-full bg-gradient-to-r py-16 mb-20"
        style={{
          backgroundImage: theme === "dark" 
            ? "linear-gradient(to right, #1a1333, #2a1e4d, #1a1333)" 
            : "linear-gradient(to right, #FFF8E1, #FAF9F6, #FFF8E1)"
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2 
            className="font-fraunces text-3xl md:text-4xl font-bold mb-10 text-center"
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            initial={{ opacity: 0 }}
            animate={colorInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Color System & Typography
          </motion.h2>
          
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={colorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 
              className="font-fraunces text-xl font-bold mb-6 text-center"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Dual Theming Strategy
            </h3>
            
            <div className="glass-card p-6 rounded-xl">
              <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                The platform implements a comprehensive dual theming system with carefully calibrated light and dark modes that maintain consistent brand identity 
                while providing optimal readability and reduced eye strain across different environments. This adaptive approach ensures the visual experience 
                remains cohesive regardless of user preference or ambient conditions.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={colorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div>
              <h3 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Primary Color Palette
              </h3>
              <div className="glass-card p-6 rounded-xl h-full">
                <div className="mb-4">
                  <div className="font-medium mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Brand Colors (Consistent across themes)</div>
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-lg mb-1" style={{ backgroundColor: "#4E2A84" }}></div>
                      <span className="text-xs" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>#4E2A84</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-lg mb-1" style={{ backgroundColor: "#FFC72C" }}></div>
                      <span className="text-xs" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>#FFC72C</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-lg mb-1" style={{ backgroundColor: "#009688" }}></div>
                      <span className="text-xs" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>#009688</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-lg mb-1" style={{ backgroundColor: "#FF7F50" }}></div>
                      <span className="text-xs" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>#FF7F50</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>
                    {theme === "dark" ? "Dark Theme Foundation" : "Light Theme Foundation"}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-lg mb-1" style={{ 
                        backgroundColor: theme === "dark" ? "#18122B" : "#FAF9F6"
                      }}></div>
                      <span className="text-xs" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                        {theme === "dark" ? "#18122B" : "#FAF9F6"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-lg mb-1" style={{ 
                        backgroundColor: theme === "dark" ? "#F5E9C9" : "#18122B"
                      }}></div>
                      <span className="text-xs" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                        {theme === "dark" ? "#F5E9C9" : "#18122B"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-lg mb-1" style={{ 
                        backgroundColor: theme === "dark" ? "#1A1333" : "#FFFFFF",
                        opacity: theme === "dark" ? 0.85 : 0.7,
                        border: "1px solid",
                        borderColor: theme === "dark" ? "#3A2A5D" : "#E5E5E5"
                      }}></div>
                      <span className="text-xs" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Surface</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-lg mb-1" style={{ 
                        backgroundColor: theme === "dark" ? "#3A2A5D" : "#E5E5E5"
                      }}></div>
                      <span className="text-xs" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Dividers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Typography System
              </h3>
              <div className="glass-card p-6 rounded-xl h-full">
                <div className="mb-4">
                  <div className="font-medium mb-2" style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}>Primary Typefaces</div>
                  <div className="mb-3">
                    <div className="text-2xl font-fraunces font-bold" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Fraunces</div>
                    <div className="text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>A serif with personality and cultural flair</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-xl font-inter" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Inter</div>
                    <div className="text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>Exceptionally readable sans-serif</div>
                  </div>
                  <div>
                    <div className="text-lg font-mono" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>IBM Plex Mono</div>
                    <div className="text-sm" style={{ color: theme === "dark" ? "#b3a689" : "#6C2EB7" }}>Technical feel for data/statistics</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Component Design System Section */}
      <div 
        ref={componentRef}
        className="max-w-5xl mx-auto px-4 mb-20"
      >
        <motion.h2 
          className="font-fraunces text-3xl md:text-4xl font-bold mb-10 text-center"
          style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          initial={{ opacity: 0 }}
          animate={componentInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Component Design System
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={componentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          <motion.div 
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={componentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 
              className="font-fraunces text-xl font-bold mb-4"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Glass Morphism Evolution
            </h3>
            <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              Implementing an advanced glass morphism technique that adapts to the active theme, featuring backdrop blur, 
              themed background opacity, contextual borders, subtle light reflections, and theme-specific shadow treatments.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={componentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 
              className="font-fraunces text-xl font-bold mb-4"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Card System
            </h3>
            <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              Three-tiered card system with increasing visual prominence, adapting to active theme: Ambient Cards for information, 
              Feature Cards for medium prominence, and Hero Cards for maximum visual impact with illustrations and animations.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={componentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 
              className="font-fraunces text-xl font-bold mb-4"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Button Hierarchy
            </h3>
            <p style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
              Four-level button system with consistent interaction patterns across themes: Primary gradient-filled buttons, 
              Secondary outlined buttons, Tertiary text-only buttons with animated underlines, and Quaternary icon buttons with tooltips.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Technical Implementation Section */}
      <div 
        ref={techRef}
        className="w-full bg-gradient-to-r py-16 mb-10"
        style={{
          backgroundImage: theme === "dark" 
            ? "linear-gradient(to right, #1a1333, #2a1e4d, #1a1333)" 
            : "linear-gradient(to right, #FFF8E1, #FAF9F6, #FFF8E1)"
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2 
            className="font-fraunces text-3xl md:text-4xl font-bold mb-10 text-center"
            style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            initial={{ opacity: 0 }}
            animate={techInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Technical Implementation
          </motion.h2>
          
          <motion.div 
            className="glass-card p-6 rounded-xl mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 
              className="font-fraunces text-xl font-bold mb-4 text-center"
              style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
            >
              Core Technologies
            </h3>
            
            <div className="grid md:grid-cols-5 gap-4 text-center">
              <div>
                <div 
                  className="font-bold mb-1" 
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  React + Vite
                </div>
                <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Front-end foundation</div>
              </div>
              <div>
                <div 
                  className="font-bold mb-1" 
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  Framer Motion
                </div>
                <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Animation system</div>
              </div>
              <div>
                <div 
                  className="font-bold mb-1" 
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  TailwindCSS
                </div>
                <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Utility-first styling</div>
              </div>
              <div>
                <div 
                  className="font-bold mb-1" 
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  GSAP
                </div>
                <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>Complex animations</div>
              </div>
              <div>
                <div 
                  className="font-bold mb-1" 
                  style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
                >
                  Three.js
                </div>
                <div className="text-sm" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>3D elements & effects</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card p-6 rounded-xl">
              <h3 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Theme Implementation
              </h3>
              <ul className="list-disc pl-5 space-y-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                <li>React Context API for theme state management</li>
                <li>Dynamic CSS Variables that update on theme toggle</li>
                <li>Smooth color and property transitions</li>
                <li>Media Query Integration for system preferences</li>
                <li>Persistent Preferences via localStorage</li>
              </ul>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <h3 
                className="font-fraunces text-xl font-bold mb-4"
                style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
              >
                Accessibility & Inclusivity
              </h3>
              <ul className="list-disc pl-5 space-y-2" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
                <li>Dark/Light Theme with proper color contrast</li>
                <li>High Contrast Mode activated via system preferences</li>
                <li>Motion Reduction for vestibular disorders</li>
                <li>Screen Reader Optimizations with ARIA labels</li>
                <li>Keyboard Navigation with visible focus states</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto px-4 mb-20 text-center">
        <motion.h2 
          className="font-fraunces text-3xl md:text-4xl font-bold mb-6"
          style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Meet the Team
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          NaSCon is brought to you by the dedicated students of FAST-NUCES Islamabad, passionate about technology, 
          innovation, and creating memorable experiences.
        </motion.p>
        
        <motion.div
          className="glass-card p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-center" style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}>
            This website was designed and developed with ❤️ by the 23rd Batch Class of BS-4AI<br />
            Frontend: Hammad [23i-012], Abu [23i-0125] Backend: Rafay [23i-0117], zar [23i-0125]
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
