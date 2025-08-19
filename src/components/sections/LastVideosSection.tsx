"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import {
  Play,
  Calendar,
  Eye,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Clock,
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
import { useYouTube } from "@/contexts/YouTubeContext";
import BackgroundElements from "@/components/shared/BackgroundElements";
import SectionHeader from "@/components/shared/SectionHeader";

const LastVideosSection: React.FC = () => {
  const { data, loading, error, refetch } = useYouTube();

  const latestVideo = data?.videoData;
  const liveData = data?.liveData;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatViewCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M vues`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K vues`;
    }
    return `${num} vues`;
  };

  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match?.[1] || "").replace("H", "");
    const minutes = (match?.[2] || "").replace("M", "");
    const seconds = (match?.[3] || "").replace("S", "");

    let formatted = "";
    if (hours) formatted += `${hours}:`;
    formatted += `${minutes || "0"}:${seconds?.padStart(2, "0") || "00"}`;
    return formatted;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      <BackgroundElements />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          primaryIcon={Play}
          secondaryIcon={Sparkles}
          title="Dernière"
          subtitle="Publication"
          description="Ne ratez rien de mes dernières aventures gaming ! 🎮"
          accent="✨ Contenu Exclusif ✨"
        />

        {/* Avatar avec bordure animée - ajouté au header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <m.div
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-2xl blur opacity-75"></div>
            <div className="relative bg-slate-800 p-2 rounded-2xl">
              <Image
                src="https://mc-heads.net/avatar/Este_YTB"
                alt="Este_YTB Avatar"
                width={80}
                height={80}
                className="rounded-xl"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </m.div>
        </m.div>

        {/* Video Content */}
        {loading ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-32"
          >
            <div className="text-center">
              <LoadingSpinner
                size="lg"
                message="Récupération du contenu..."
              />
              <m.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-slate-400 mt-6"
              >
                Connexion avec YouTube...
              </m.p>
            </div>
          </m.div>
        ) : error ? (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-red-500/10 backdrop-blur-lg border border-red-400/30 rounded-3xl p-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Erreur de connexion
                  </h3>
                  <p className="text-red-300 mb-1">{error}</p>
                  <p className="text-slate-400 text-sm">
                    Vérifiez votre connexion ou réessayez dans quelques instants
                  </p>
                </div>

                <m.button
                  onClick={refetch}
                  className="inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  Réessayer maintenant
                </m.button>
              </div>
            </div>
          </m.div>
        ) : liveData?.isLive ? (
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              {/* Animated border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-400 via-pink-400 to-red-400 rounded-3xl blur-lg opacity-60 animate-pulse"></div>

              <div className="relative bg-slate-800/80 backdrop-blur-xl border border-red-400/20 rounded-3xl p-12 text-center">
                <div className="space-y-8">
                  <div className="relative">
                    <m.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto"
                    >
                      <Play className="w-12 h-12 text-white ml-1" fill="currentColor" />
                    </m.div>
                    <div className="absolute -inset-4 border-2 border-red-400/50 rounded-full animate-ping"></div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      🔴 LIVE EN COURS !
                    </h3>
                    <p className="text-xl text-slate-300 mb-8">
                      Je suis actuellement en direct — rejoignez l'aventure maintenant !
                    </p>
                  </div>

                  <m.a
                    href={String(liveData.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-6 h-6" />
                    Rejoindre le LIVE
                    <ExternalLink className="w-5 h-5" />
                  </m.a>
                </div>
              </div>
            </div>
          </m.div>
        ) : latestVideo ? (
          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-5 gap-12 items-center">
                {/* Video Thumbnail - Takes 3 columns */}
                <div className="lg:col-span-3">
                  <m.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${latestVideo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Regarder ${latestVideo.title}`}
                    >
                      <div className="relative overflow-hidden rounded-2xl">
                        {/* Glowing border on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-300"></div>

                        <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
                          <Image
                            src={latestVideo.thumbnail || ""}
                            alt={latestVideo.title}
                            width={800}
                            height={450}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Play overlay with better animation */}
                          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <m.div
                              whileHover={{ scale: 1.2 }}
                              className="relative"
                            >
                              <div className="absolute -inset-4 bg-red-500/50 rounded-full blur-lg"></div>
                              <div className="relative w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-2xl">
                                <Play
                                  className="w-10 h-10 text-white ml-1"
                                  fill="currentColor"
                                />
                              </div>
                            </m.div>
                          </div>

                          {/* Duration badge */}
                          {latestVideo.duration && (
                            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium border border-slate-700/50">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDuration(latestVideo.duration)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  </m.div>
                </div>

                {/* Video Info - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <m.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                        {latestVideo.title}
                      </h3>

                      <p className="text-slate-300 text-lg leading-relaxed line-clamp-4">
                        {latestVideo.description}
                      </p>
                    </div>

                    {/* Video Stats in cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-cyan-400" />
                          <div>
                            <p className="text-slate-400 text-xs">Publié le</p>
                            <p className="text-white font-medium text-sm">
                              {formatDate(latestVideo.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {latestVideo.viewCount && (
                        <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                          <div className="flex items-center gap-3">
                            <Eye className="w-5 h-5 text-purple-400" />
                            <div>
                              <p className="text-slate-400 text-xs">Vues</p>
                              <p className="text-white font-medium text-sm">
                                {formatViewCount(latestVideo.viewCount)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <m.a
                      href={`https://www.youtube.com/watch?v=${latestVideo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-button-primary justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-5 h-5" />
                      Regarder maintenant
                      <ExternalLink className="w-4 h-4" />
                    </m.a>
                  </m.div>
                </div>
              </div>
            </div>
          </m.div>
        ) : (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/30">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-slate-400" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                Aucun contenu trouvé
              </h3>
              <p className="text-slate-400 mb-8">
                Aucune vidéo n'est disponible pour le moment
              </p>

              <m.button
                onClick={refetch}
                className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </m.button>
            </div>
          </m.div>
        )}
      </div>
    </section>
  );
};

export default LastVideosSection;