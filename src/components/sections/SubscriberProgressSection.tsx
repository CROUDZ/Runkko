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
} from "lucide-react";
import { useYouTube } from "@/contexts/YouTubeContext";

const SubscriberProgressSection: React.FC = () => {
  const { data } = useYouTube();
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastMilestone, setLastMilestone] = useState<number | null>(null);

  // Synchroniser avec les données du contexte
  useEffect(() => {
    if (data?.channelData?.subscriberCount != null) {
      const newCount = data.channelData.subscriberCount;

      setSubscriberCount((prevCount) => {
        // Vérifier les milestones seulement si on a un ancien compteur
        if (prevCount != null && prevCount !== newCount) {
          checkMilestone(newCount, prevCount);
        }
        return newCount;
      });
    }
  }, [data?.channelData?.subscriberCount]);

  // Helper: choisir un objectif 'milestone' attractif en fonction du nombre actuel
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

  const formatNumber = (n: number | null) =>
    n === null ? "-" : n.toLocaleString("fr-FR");

  // Obtenir l'icône et le message selon le milestone
  const getMilestoneInfo = (goal: number) => {
    if (goal <= 10)
      return {
        icon: Target,
        message: "Premier cap !",
        color: "text-green-400",
      };
    if (goal <= 50)
      return {
        icon: Star,
        message: "En pleine montée (50) !",
        color: "text-blue-400",
      };
    if (goal <= 100)
      return {
        icon: Trophy,
        message: "100 atteint récemment !",
        color: "text-yellow-400",
      };
    if (goal <= 1000)
      return {
        icon: Crown,
        message: "Vers le millier !",
        color: "text-purple-400",
      };
    if (goal <= 10000)
      return {
        icon: Sparkles,
        message: "10K, c'est magique !",
        color: "text-pink-400",
      };
    if (goal <= 100000)
      return {
        icon: Gift,
        message: "Communauté en pleine croissance !",
        color: "text-orange-400",
      };
    if (goal <= 1000000)
      return {
        icon: Crown,
        message: "Objectif 100K+ en vue !",
        color: "text-red-400",
      };
    return { icon: Trophy, message: "Objectif 1M !", color: "text-gradient" };
  };

  // Vérifier si un nouveau milestone a été atteint
  const checkMilestone = (newCount: number, oldCount: number | null) => {
    // Ne pas déclencher si on n'a pas d'ancien compteur connu
    if (oldCount == null) return false;

    const milestones = [10, 50, 100, 1000, 10000, 100000, 1000000];

    for (const milestone of milestones) {
      if (oldCount < milestone && newCount >= milestone) {
        setLastMilestone(milestone);
        setShowCelebration(true);
        // La célébration restera active jusqu'à ce que le compteur dépasse le palier de 5% (géré par un useEffect ci-dessous)
        return true;
      }
    }
    return false;
  };

  // Arrêter la célébration lorsque le palier atteint est dépassé de 5%
  useEffect(() => {
    if (!showCelebration || lastMilestone == null || subscriberCount == null)
      return;

    const threshold = Math.ceil(lastMilestone * 1.05);
    if (subscriberCount >= threshold) {
      setShowCelebration(false);
    }
  }, [subscriberCount, lastMilestone, showCelebration]);

  const subscriberGoal = getMilestoneGoal(subscriberCount);
  const percentage = subscriberCount
    ? Math.min(100, Math.round((subscriberCount / subscriberGoal) * 100))
    : 0;

  const milestoneInfo = getMilestoneInfo(subscriberGoal);
  const MilestoneIcon = milestoneInfo.icon;

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      {/* Floating particles pour l'ambiance */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <m.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            animate={{
              y: [-20, -120],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + (i % 4) * 20}%`,
              top: "90%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Rejoins la
            <span className="block bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Communauté Runkko
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Chaque abonnement nous rapproche de nouveaux contenus exclusifs et
            d'aventures épiques !
          </p>
        </m.div>

        {/* Carte principale de progression */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl">
            {/* Header avec stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wider mb-2">
                  <Users className="w-4 h-4" />
                  Abonnés YouTube
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white">
                  {formatNumber(subscriberCount)}
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <MilestoneIcon className={`w-4 h-4 ${milestoneInfo.color}`} />
                  Prochain objectif
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {formatNumber(subscriberGoal)}
                </div>
                <div className={`text-sm font-medium ${milestoneInfo.color}`}>
                  {milestoneInfo.message}
                </div>
              </div>
            </div>

            {/* Barre de progression stylée */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300">Progression</span>
                <span className="text-lg font-bold text-white">
                  {percentage}%
                </span>
              </div>

              <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden">
                {/* Barre de progression avec gradient animé */}
                <m.div
                  className="h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 relative"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                >
                  {/* Effet de brillance qui passe */}
                  <m.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                  />
                </m.div>

                {/* Points de milestone sur la barre */}
                <div className="absolute inset-0 flex items-center">
                  {[25, 50, 75].map((point) => (
                    <div
                      key={point}
                      className={`absolute w-3 h-3 rounded-full border-2 ${
                        percentage >= point
                          ? "bg-white border-white"
                          : "bg-white/30 border-white/50"
                      }`}
                      style={{
                        left: `${point}%`,
                        transform: "translateX(-50%)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Texte de progression */}
              <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                <span>Début du voyage</span>
                <span className="text-center">
                  {subscriberCount && subscriberGoal - subscriberCount > 0
                    ? `Plus que ${formatNumber(subscriberGoal - subscriberCount)} !`
                    : "Objectif atteint ! 🎉"}
                </span>
                <span>Objectif</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <m.a
                href="https://www.youtube.com/@Runkko_YT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-600/30 group text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5 group-hover:scale-105 transition-transform" />
                S'abonner maintenant
                <ExternalLink className="w-4 h-4 opacity-70" />
              </m.a>

              <div className="text-center text-sm text-gray-400 max-w-xs">
                🎁 Chaque nouveau palier débloque du contenu exclusif et des
                surprises !
              </div>
            </div>
          </div>
        </m.div>
      </div>

      {/* Animation de célébration pour les milestones */}
      <AnimatePresence>
        {showCelebration && lastMilestone && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <m.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-yellow-400 to-red-500 p-8 rounded-2xl text-center max-w-md mx-4"
            >
              <m.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4"
              >
                🎉
              </m.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Nouveau milestone !
              </h3>
              <p className="text-lg text-white/90 mb-4">
                🚀 {formatNumber(lastMilestone)} abonnés atteints !
              </p>
              <p className="text-white/80">
                Merci pour votre soutien incroyable ! 💖
              </p>

              {/* Confettis animés */}
              {[...Array(20)].map((_, i) => (
                <m.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: Math.random() * 300 + 100,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SubscriberProgressSection;
