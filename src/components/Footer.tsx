"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Youtube, MessageCircle, Heart, ExternalLink, Code, Sparkles } from "lucide-react";

import Profile from "@/assets/profile.webp";

const Footer: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-t from-slate-900 via-slate-800 to-purple-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <m.div
            key={i}
            className={`absolute ${
              i % 2 === 0 
                ? 'w-2 h-2 bg-cyan-400/20 rounded-full' 
                : 'w-1 h-4 bg-purple-400/20 rounded-full'
            }`}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: 3 + i * 0.5, 
              delay: i * 0.8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ 
              left: `${20 + i * 20}%`, 
              bottom: `${20 + (i % 2) * 30}%` 
            }}
          />
        ))}
      </div>

      <m.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-6 py-16"
      >
        <div className="max-w-6xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center mb-12">
            
            {/* Brand Section */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left space-y-6"
            >
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="relative">
                  {/* Animated border */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur opacity-60"></div>
                  <div className="relative bg-slate-800 p-1 rounded-full">
                    <Image
                      src={Profile}
                      alt="Este_YTB Avatar"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                    Este_YTB
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Gaming & Aventures
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed max-w-sm mx-auto lg:mx-0">
                Rejoignez une communauté passionnée de gaming, de créations Minecraft et d'aventures épiques !
              </p>
            </m.div>

            {/* Social Links */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-white text-center mb-8">
                Retrouvez-moi sur
              </h3>
              
              <div className="space-y-4">
                {/* YouTube Link */}
                <m.a
                  href="https://www.youtube.com/@Este_YTB_YT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-slate-800/40 backdrop-blur-sm hover:bg-slate-800/60 border border-slate-700/50 hover:border-red-500/50 rounded-xl p-4 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <Youtube className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">YouTube</p>
                    <p className="text-slate-400 text-sm">@Este_YTB_YT</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </m.a>

                {/* Discord Link */}
                <m.a
                  href="https://discord.gg/t6U4hZDrnF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-slate-800/40 backdrop-blur-sm hover:bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/50 rounded-xl p-4 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <MessageCircle className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Discord</p>
                    <p className="text-slate-400 text-sm">Communauté active</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </m.a>
              </div>
            </m.div>

            {/* Developer Credit */}
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center lg:text-right space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 justify-center lg:justify-end text-slate-300">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span className="font-medium">Développé par</span>
                </div>
                
                <m.a
                  href="https://giovweb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 rounded-xl p-6 transition-all duration-300">
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-2">
                      GiovWeb
                    </div>
                    <div className="flex items-center gap-2 justify-center lg:justify-end text-slate-400 text-sm">
                      <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                      <span>Réalisé avec passion</span>
                    </div>
                  </div>
                </m.a>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-end text-slate-400 text-sm">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Site 100% gratuit</span>
              </div>
            </m.div>
          </div>

          {/* Bottom Bar */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="border-t border-slate-700/50 pt-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span>© {new Date().getFullYear()} Este_YTB</span>
                <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
                <span>Tous droits réservés</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Site actif</span>
                </div>
                <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Made in France</span>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </m.footer>
    </section>
  );
};

export default Footer;