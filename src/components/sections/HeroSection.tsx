"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Play, Users, ExternalLink, Zap, Trophy } from "lucide-react";
import { useYouTube } from "@/contexts/YouTubeContext";
import BackgroundElements from "@/components/shared/BackgroundElements";
import { StatCard, GlassCard } from "@/components/shared/GlassCard";
import CTAButton from "@/components/shared/CTAButton";

import Este_YTBBody from "@/assets/este-body.webp";

const HeroSection: React.FC = () => {
  const { data } = useYouTube();
  const liveData = data?.liveData || { isLive: false, url: false };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden pt-16">
      <BackgroundElements />

      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Status Bar avec design unifié */}
        <m.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-lg border ${
            liveData.isLive
              ? "bg-red-500/10 border-red-400/30 text-red-300"
              : "bg-slate-700/30 border-slate-500/30 text-slate-300"
          }`}>
            <div className={`w-2 h-2 rounded-full ${liveData.isLive ? 'bg-red-400 animate-pulse' : 'bg-slate-400'}`}></div>
            <span className="text-sm font-medium">
              {liveData.isLive ? (
                <>
                  LIVE - <a href={liveData.url || "#"} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Minecraft Bedwars</a>
                </>
              ) : (
                "Actuellement hors ligne"
              )}
            </span>
          </div>
        </m.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
          
          {/* Section gauche - Contenu principal */}
          <m.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 text-white space-y-8"
          >
            {/* En-tête avec design unifié */}
            <div className="space-y-6">
              <div className="section-header-icons">
                <div className="icon-circle-primary">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div className="icon-divider"></div>
                <div className="icon-circle-secondary">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold gradient-text-primary">
                Este_YTB
              </h2>
              <h1 className="section-title">
                Gaming &
                <span className="block gradient-text-secondary">
                  Aventures
                </span>
              </h1>
            </div>

            <p className="section-subtitle">
              Plongez dans l'univers Minecraft avec 8 ans d'expertise ! PvP intense, constructions épiques, mods exclusifs et découvertes multi-gaming vous attendent.
            </p>

            {/* Icons avec design unifié */}
            <div className="flex flex-wrap gap-4">
              <div className="glass-card px-4 py-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">Action</span>
                </div>
              </div>
              <div className="glass-card px-4 py-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm">Expert</span>
                </div>
              </div>
            </div>

            {/* CTA Button unifié */}
            <CTAButton
              href="https://www.youtube.com/@Este_YTB_YT"
              leftIcon={Play}
              rightIcon={ExternalLink}
            >
              Découvrir la chaîne
            </CTAButton>
          </m.div>

          {/* Section centrale - Image avec design circulaire unifié */}
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 flex justify-center relative"
          >
            {/* Anneaux rotatifs avec design unifié */}
            <m.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-80 h-80 border border-purple-400/20 rounded-full"
            />
            <m.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 w-72 h-72 border border-cyan-400/20 rounded-full"
            />
            
            {/* Centre lumineux */}
            <div className="absolute inset-8 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 rounded-full backdrop-blur-sm"></div>
            
            <m.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              <Image
                src={Este_YTBBody}
                alt="Este_YTB Character"
                width={320}
                height={480}
                className="w-64 h-auto object-contain filter drop-shadow-2xl"
                priority
              />
            </m.div>
          </m.div>

          {/* Section droite - Stats & Discord avec design unifié */}
          <m.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Cartes de stats avec design unifié */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={Play}
                value="200+"
                label="Vidéos"
                iconColor="text-red-400"
              />
              
              <StatCard
                icon={Users}
                value="5K+"
                label="Abonnés"
                iconColor="text-cyan-400"
              />
            </div>

            {/* Section Discord avec design unifié */}
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-3">Rejoins la communauté</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Connecte-toi avec d'autres joueurs, partage tes créations et reste informé des dernières news !
              </p>
              <CTAButton
                href="https://discord.gg/t6U4hZDrnF"
                leftIcon={Users}
                rightIcon={ExternalLink}
                className="w-full justify-center"
                size="sm"
              >
                Rejoindre Discord
              </CTAButton>
            </GlassCard>
          </m.div>
        </div>

        {/* Indicateur de scroll unifié */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
        >
          <m.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-slate-400"
          >
            <span className="text-xs mb-2">Explorer plus</span>
            <div className="w-6 h-10 border border-slate-400 rounded-full flex justify-center items-start pt-2">
              <m.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-slate-400 rounded-full"
              />
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default HeroSection;