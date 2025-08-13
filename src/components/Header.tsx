"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Play,
  Users,
  Home,
  User,
  Gamepad2,
  MessageCircle,
} from "lucide-react";

import Profile from "@/assets/profile.webp"; // Assuming you have a logo image

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: "#home", label: "Accueil", icon: Home },
    { href: "#videos", label: "Vidéos", icon: Play },
    { href: "#about", label: "À propos", icon: User },
    { href: "#gaming", label: "Gaming", icon: Gamepad2 },
    { href: "#contact", label: "Contact", icon: MessageCircle },
  ];

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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <m.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 group"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </m.div>
            );
          })}
        </div>

        {/* Social CTAs - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <m.a
            href="https://www.youtube.com/@Runkko_YT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-red-600/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4" />
            <span>YouTube</span>
          </m.a>

          <m.a
            href="https://discord.gg/GSV2jReb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-indigo-600/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-4 h-4" />
            <span>Discord</span>
          </m.a>
        </div>

        {/* Mobile Menu Button */}
        <m.button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-white hover:text-yellow-400 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </m.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <m.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 text-white/80 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </m.div>
                );
              })}

              {/* Mobile Social CTAs */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <m.a
                  href="https://www.youtube.com/@Runkko_YT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-all duration-300 font-medium"
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Ma chaîne YouTube</span>
                </m.a>

                <m.a
                  href="https://discord.gg/GSV2jReb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-all duration-300 font-medium"
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-5 h-5" />
                  <span>Rejoindre Discord</span>
                </m.a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
};

export default Header;
