"use client";

import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Users,
  ExternalLink,
  Trophy,
  Star,
  Crown,
  Target,
  Sparkles,
  Gift,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useYouTube } from "@/contexts/YouTubeContext";
import SectionHeader from "@/components/shared/SectionHeader";

const SubscriberProgressSection: React.FC = () => {
  const { data } = useYouTube();
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastMilestone, setLastMilestone] = useState<number | null>(null);

  useEffect(() => {
    if (data?.channelData?.subscriberCount != null) {
      const newCount = data.channelData.subscriberCount;
      setSubscriberCount((prevCount) => {
        if (prevCount != null && prevCount !== newCount) checkMilestone(newCount, prevCount);
        return newCount;
      });
    }
  }, [data?.channelData?.subscriberCount]);

  useEffect(() => {
    if (subscriberCount != null) {
      const milestones = [10, 50, 100, 1000, 10000, 100000, 1000000];
      const lastReachedMilestone = milestones.filter((m) => subscriberCount >= m).pop();
      if (lastReachedMilestone) {
        const threshold = Math.ceil(lastReachedMilestone * 1.05);
        if (subscriberCount <= threshold) {
          setLastMilestone(lastReachedMilestone);
          setShowCelebration(true);
        }
      }
    }
  }, [subscriberCount]);

  const getMilestoneGoal = (count: number | null) => {
    if (!count || count < 10) return 10;
    if (count < 50) return 50;
    if (count < 100) return 100;
    if (count < 1000) return 1000;
    if (count < 10000) return 10000;
    if (count < 100000) return 100000;
    if (count < 1000000) return 1000000;
    return Math.ceil(count / 1000000) * 1000000;
  };

  const formatNumber = (n: number | null) => (n === null ? "-" : n.toLocaleString("fr-FR"));

  const getMilestoneInfo = (goal: number) => {
    if (goal <= 10) return { icon: Target, message: "Premier objectif !", color: "text-cyan-400" };
    if (goal <= 50) return { icon: Star, message: "Montée fulgurante !", color: "text-purple-400" };
    if (goal <= 100) return { icon: Trophy, message: "Centaine atteinte !", color: "text-yellow-400" };
    if (goal <= 1000) return { icon: Crown, message: "Direction le K !", color: "text-pink-400" };
    if (goal <= 10000) return { icon: Sparkles, message: "10K magiques !", color: "text-cyan-400" };
    if (goal <= 100000) return { icon: Gift, message: "Communauté massive !", color: "text-purple-400" };
    if (goal <= 1000000) return { icon: Crown, message: "Vers les 100K+ !", color: "text-yellow-400" };
    return { icon: Trophy, message: "Million en vue !", color: "text-pink-400" };
  };

  const checkMilestone = (newCount: number, oldCount: number | null) => {
    if (oldCount == null) return false;
    const milestones = [10, 50, 100, 1000, 10000, 100000, 1000000];
    for (const milestone of milestones) {
      if (oldCount < milestone && newCount >= milestone) {
        setLastMilestone(milestone);
        setShowCelebration(true);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!showCelebration || lastMilestone == null || subscriberCount == null) return;
    const threshold = Math.ceil(lastMilestone * 1.05);
    if (subscriberCount > threshold) setShowCelebration(false);
  }, [subscriberCount, lastMilestone, showCelebration]);

  const subscriberGoal = getMilestoneGoal(subscriberCount);
  const percentage = subscriberCount ? Math.min(100, Math.round((subscriberCount / subscriberGoal) * 100)) : 0;
  const milestoneInfo = getMilestoneInfo(subscriberGoal);
  const MilestoneIcon = milestoneInfo.icon;

  return (
    <section className="relative py-24 bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
      {/* Unified Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Unified Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-6">
        <SectionHeader
          primaryIcon={Users}
          secondaryIcon={TrendingUp}
          title="Communauté"
          subtitle="Este_YTB"
          description="Rejoins des milliers de joueurs passionnés ! Chaque abonnement nous rapproche de contenus exclusifs et d'aventures épiques 🚀"
        />

        {/* Celebration Banner */}
        <AnimatePresence>
          {showCelebration && lastMilestone && (
            <m.div
              initial={{ opacity: 0, scale: 0.9, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              className="max-w-5xl mx-auto mb-12"
            >
              <div className="relative">
                {/* Animated border */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
                
                <div className="relative bg-slate-800/90 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-8 text-center">
                  <div className="flex items-center justify-center gap-6">
                    <m.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      className="text-4xl"
                    >
                      🎉
                    </m.div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text">
                        PALIER DÉBLOQUÉ ! 🚀
                      </h3>
                      <p className="text-slate-300 text-lg">
                        <span className="font-bold text-white">{formatNumber(lastMilestone)}</span> abonnés atteints !
                        <br />
                        <span className="text-yellow-400">Merci pour votre soutien incroyable ! 💖</span>
                      </p>
                    </div>
                    
                    <m.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-4xl"
                    >
                      ✨
                    </m.div>
                  </div>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Main Progress Dashboard */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className={`absolute -inset-4 bg-gradient-to-r rounded-3xl blur-2xl opacity-20 ${
              showCelebration 
                ? 'from-yellow-400 via-pink-400 to-purple-400' 
                : 'from-purple-400 via-cyan-400 to-purple-400'
            }`}></div>
            
            <div className="relative bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-12">
              
              {/* Stats Header */}
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                
                {/* Current Subscribers */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center gap-2 text-slate-400 text-sm uppercase tracking-wider mb-4">
                    <Users className="w-4 h-4" />
                    <span>Abonnés actuels</span>
                  </div>
                  <div className="relative">
                    <div className={`text-6xl lg:text-7xl font-bold transition-all duration-500 ${
                      showCelebration 
                        ? 'text-transparent bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text' 
                        : 'text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text'
                    }`}>
                      {formatNumber(subscriberCount)}
                    </div>
                    {showCelebration && (
                      <m.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute -top-4 -right-4 text-3xl"
                      >
                        🔥
                      </m.div>
                    )}
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    {/* Background circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="rgb(51 65 85)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <m.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                        whileInView={{ 
                          strokeDashoffset: 2 * Math.PI * 45 * (1 - percentage / 100)
                        }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        viewport={{ once: true }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Percentage in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">{percentage}%</div>
                        <div className="text-slate-400 text-sm">Progression</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Goal */}
                <div className="text-center lg:text-right">
                  <div className="flex items-center gap-2 text-slate-400 text-sm uppercase tracking-wider mb-4 justify-center lg:justify-end">
                    <MilestoneIcon className={`w-4 h-4 ${milestoneInfo.color}`} />
                    <span>Prochain palier</span>
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {formatNumber(subscriberGoal)}
                  </div>
                  <div className={`text-lg font-semibold ${milestoneInfo.color}`}>
                    {milestoneInfo.message}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Progression vers l'objectif</span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-bold text-lg">{percentage}%</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full h-6 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <m.div
                      className={`h-full rounded-full transition-all duration-500 ${
                        showCelebration 
                          ? 'bg-gradient-to-r from-yellow-400 to-pink-400' 
                          : 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                  
                  {/* Progress indicator */}
                  {percentage > 5 && (
                    <m.div
                      className="absolute top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                      initial={{ left: "0%" }}
                      whileInView={{ left: `${Math.min(percentage, 95)}%` }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                      viewport={{ once: true }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                    </m.div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Début</span>
                  <span className="text-center font-medium text-slate-300">
                    {subscriberCount && subscriberGoal - subscriberCount > 0
                      ? `Plus que ${formatNumber(subscriberGoal - subscriberCount)} à atteindre !`
                      : "Objectif atteint ! Nouveau palier débloqué ! 🎉"}
                  </span>
                  <span>Objectif</span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center space-y-6">
                <m.a
                  href="https://www.youtube.com/@Este_YTB_YT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button-primary text-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-6 h-6" />
                  <span>Rejoindre l'aventure</span>
                  <ExternalLink className="w-5 h-5" />
                </m.a>
                
                <div className="flex items-center justify-center gap-4 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm">Contenu exclusif</span>
                  </div>
                  <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-400" />
                    <span className="text-sm">Communauté active</span>
                  </div>
                  <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">Surprises à chaque palier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default SubscriberProgressSection;