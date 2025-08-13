"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Play, Users } from "lucide-react";

import Profile from "@/assets/profile.webp";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <m.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <m.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="relative">
            <Image
              src={Profile}
              alt="Runkko Avatar"
              width={48}
              height={48}
              className="rounded-full border-2 border-yellow-400 shadow-lg"
            />
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Runkko
            </h1>
            <p className="text-xs text-gray-400 -mt-1">
              Gaming Content Creator
            </p>
          </div>
        </m.div>

        {/* Social CTAs */}
        <div className="flex items-center space-x-4">
          <m.a
            href="https://www.youtube.com/@Runkko_YT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-red-600/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">YouTube</span>
          </m.a>

          <m.a
            href="https://discord.gg/t6U4hZDrnF"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-indigo-600/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Discord</span>
          </m.a>
        </div>
      </nav>
    </m.header>
  );
};

export default Header;