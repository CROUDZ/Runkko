"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Play, Users, ExternalLink } from "lucide-react";

import RunkkoBody from "@/assets/runkko-body.webp";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <m.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: "80%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full text-red-300 text-sm font-medium"
            >
              🔴 EN LIVE • Minecraft Bedwars
            </m.div>

            {/* Main Title */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Bienvenue sur
                <span className="block bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Runkko
                </span>
              </h1>
            </m.div>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
            >
              🎮 <strong>100% fun, skill et bonne humeur</strong> ! Spécialiste
              Minecraft Bedwars avec des clutchs de fou, du multi-gaming et des
              moments épiques à partager !
            </m.p>

            {/* Stats */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 text-sm"
            >
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Play className="w-4 h-4 text-red-400" />
                <span>Videos épiques</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Communauté active</span>
              </div>
            </m.div>

            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* YouTube CTA */}
              <m.a
                href="https://www.youtube.com/@Runkko_YT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/25 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Ma chaîne YouTube
                <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
              </m.a>

              {/* Discord CTA */}
              <m.a
                href="https://discord.gg/GSV2jReb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-600/25 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Rejoindre Discord
                <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
              </m.a>
            </m.div>
          </m.div>

          {/* Right Content - Character Image */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow effect behind character */}
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-transparent rounded-full blur-3xl scale-150"></div>

            {/* Character image with hover animation */}
            <m.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <Image
                src={RunkkoBody}
                alt="Runkko - Personnage Minecraft"
                width={400}
                height={600}
                className="w-80 lg:w-96 h-auto object-contain drop-shadow-2xl"
                priority
              />
            </m.div>

            {/* Decorative elements */}
            <m.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 w-20 h-20 border-2 border-yellow-400/30 rounded-full"
            />
            <m.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 left-10 w-16 h-16 border-2 border-pink-400/30 rounded-full"
            />
          </m.div>
        </div>

        {/* Scroll indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <m.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <m.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default HeroSection;
