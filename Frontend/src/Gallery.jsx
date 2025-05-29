import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "./App";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { theme } = useContext(ThemeContext);
  
  // Gallery configuration with different sizes for visual interest
  const galleryItems = [
    { src: "/imgs/img1.png", size: "large", span: "col-span-2 row-span-2" },
    { src: "/imgs/img2.png", size: "medium" },
    { src: "/imgs/img3.png", size: "medium" },
    { src: "/imgs/img4.png", size: "medium-tall", span: "row-span-2 col-span-2" },
    { src: "/imgs/img5.png", size: "medium-wide", span: "col-span-2" },
    { src: "/imgs/img6.png", size: "small" },
    { src: "/imgs/img7.jpg", size: "medium" },
    { src: "/imgs/img8.jpg", size: "small" },
    { src: "/imgs/img9.jpg", size: "medium-wide", span: "col-span-2" },
    { src: "/imgs/img10.jpg", size: "medium" },
    { src: "/imgs/img16.jpg", size: "large", span: "col-span-2 row-span-2" },
    { src: "/imgs/img12.jpg", size: "medium" },
    { src: "/imgs/img13.jpg", size: "medium-tall", span: "row-span-2 col-span-2" },
    { src: "/imgs/img14.jpg", size: "medium" },
    { src: "/imgs/img15.jpg", size: "medium" },
    { src: "/imgs/img11.jpg", size: "medium-wide", span: "col-span-2" },
    { src: "/imgs/img18.jpg", size: "small", span: "col-span-2" },
    { src: "/imgs/img17.jpg", size: "small", span: "col-span-6"},
  ];

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="pt-28 pb-16 px-4 max-w-6xl mx-auto flex flex-col items-center w-full">
      <motion.h1
        className="font-fraunces text-5xl font-extrabold mb-3 text-center"
        style={{
          color: theme === "dark" ? "#FFC72C" : "#4E2A84",
          letterSpacing: "0.01em"
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        Last Year's Highlights
      </motion.h1>
      
      <motion.div 
        className="w-20 h-1 mb-12"
        style={{ 
          background: theme === "dark" ? "#FFC72C" : "#4E2A84",
          borderRadius: "1px"
        }}
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      
      <div className="w-full">
        {/* Asymmetric masonry-style grid layout */}
        <div className="grid grid-cols-6 gap-4 md:gap-5">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              className={`${item.span || 'col-span-2'} rounded-lg overflow-hidden shadow-md border bg-white`}
              style={{ 
                borderColor: theme === "dark" ? "rgba(58, 42, 93, 0.6)" : "rgba(229, 229, 229, 0.8)",
                boxShadow: theme === "dark" 
                  ? "0 4px 20px rgba(26, 19, 51, 0.4)"
                  : "0 4px 20px rgba(78, 42, 132, 0.08)" 
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ type: "spring", stiffness: 200, delay: i * 0.05 + 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: theme === "dark" 
                  ? "0 8px 25px rgba(26, 19, 51, 0.5), 0 0 0 1px rgba(255, 199, 44, 0.2)" 
                  : "0 8px 25px rgba(78, 42, 132, 0.12), 0 0 0 1px rgba(78, 42, 132, 0.1)" 
              }}
              onClick={() => handleImageClick(item.src)}
            >
              <div className="h-full w-full aspect-auto relative group">
                <img
                  src={item.src}
                  alt={`Gallery item ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ 
                    minHeight: item.size === 'large' ? 320 : 
                             item.size === 'medium-tall' ? 280 : 
                             item.size === 'medium' ? 180 : 
                             item.size === 'medium-wide' ? 160 : 120,
                  }}
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-3"
                >
                  <span className="text-white text-sm font-medium">View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div 
            className="relative max-w-5xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-h-[90vh] max-w-full object-contain" 
            />
            <button 
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className="mt-16 glass-card p-6 max-w-2xl rounded-xl text-center"
        style={{
          background: theme === "dark" ? "rgba(26, 19, 51, 0.7)" : "rgba(255, 255, 255, 0.7)",
          boxShadow: theme === "dark" 
            ? "0 8px 32px 0 rgba(26, 19, 51, 0.4)"
            : "0 8px 32px 0 rgba(78, 42, 132, 0.1)"
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h2 
          className="font-fraunces text-2xl font-bold mb-3"
          style={{ color: theme === "dark" ? "#FFC72C" : "#4E2A84" }}
        >
          Join Us This Year
        </h2>
        <p 
          className="mb-0" 
          style={{ color: theme === "dark" ? "#f5e9c9" : "#18122b" }}
        >
          Don't miss the opportunity to be part of NaSCon 2025's unforgettable moments and create your own highlight memories!
        </p>
      </motion.div>
    </div>
  );
}

export default Gallery;
