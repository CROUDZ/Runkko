"use client";

import React from "react";
import { m } from "framer-motion";

interface BackgroundElementsProps {
  variant?: 'default' | 'minimal';
}

const BackgroundElements: React.FC<BackgroundElementsProps> = ({ variant = 'default' }) => {
  return (
    <>
      {/* Unified Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Unified Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(variant === 'minimal' ? 4 : 6)].map((_, i) => (
          <m.div
            key={i}
            className={`absolute ${
              i % 3 === 0 
                ? 'w-3 h-3 bg-cyan-400/20 rotate-45' 
                : i % 3 === 1 
                ? 'w-2 h-2 bg-purple-400/30 rounded-full'
                : 'w-4 h-1 bg-pink-400/25 rounded-full'
            }`}
            animate={{ 
              y: [0, -40, 0], 
              x: [0, 30, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: 4 + i * 0.3, 
              delay: i * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ 
              left: `${5 + i * 15}%`, 
              top: `${15 + (i % 2) * 50}%` 
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundElements;
