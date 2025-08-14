"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Play, Calendar, Eye, ExternalLink, AlertTriangle, RefreshCw } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: string;
  duration?: string;
}

interface LiveData {
  isLive: boolean;
  url: string | false;
}

const LastVideosSection: React.FC = () => {
  const [latestVideo, setLatestVideo] = useState<VideoData | null>(null);
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try { 
        // Utiliser le port Netlify Dev en local pour les fonctions
        const apiUrl = process.env.NODE_ENV === 'development' 
          ? 'http://localhost:8888/.netlify/functions/youtube'
          : '/.netlify/functions/youtube';
        
        // Ajouter un cache-buster pour éviter les problèmes de cache
        const urlWithCacheBuster = `${apiUrl}?t=${Date.now()}`;
        
        console.log("Fetching from API:", urlWithCacheBuster);
        const response = await fetch(urlWithCacheBuster);
        console.log("Response from Netlify API:", response);
        if (!response.ok) {
          const errData = await response.json();
          setError(
            errData.error || "Erreur lors de la récupération des vidéos",
          );
          setLoading(false);
          return;
        }
        const data = await response.json();
        console.log("Full API response:", JSON.stringify(data, null, 2));
        console.log("data.videoData:", data.videoData);
        console.log("data.liveData:", data.liveData);
        const videoData: VideoData | null = data.videoData ?? null;
        const live: LiveData | null = data.liveData ?? null;
        console.log("Latest video data:", videoData);
        console.log("Live data:", live);

        setLatestVideo(videoData);
        setLiveData(live);

        // Si l'API renvoie null pour videoData et il n'y a pas de live, afficher un message clair
        if (!videoData && (!live || !live.isLive)) {
          setError("Aucune vidéo disponible pour le moment.");
        } else {
          setError(null);
        }
      } catch (err) {
        setError("Erreur lors du chargement de la vidéo");
        console.error("Erreur Netlify API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

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
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <m.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative">
              <Image
                src="https://mc-heads.net/avatar/Runkko"
                alt="Runkko Avatar"
                width={80}
                height={80}
                className="rounded-lg shadow-lg border-4 border-yellow-400"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </m.div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                Dernière Vidéo
              </h2>
              <p className="text-gray-400 text-lg">
                🔥 Du contenu frais tout juste sorti !
              </p>
            </div>
          </div>
        </m.div>

        {/* Video Content */}
        {loading ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <LoadingSpinner 
              size="lg"
              message="Chargement de la dernière vidéo..."
            />
          </m.div>
        ) : error ? (
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-red-300 mb-4">
                Erreur de chargement
              </h3>
              
              <p className="text-red-400 mb-6">
                {error}
              </p>
              
              <p className="text-gray-400 text-sm mb-8">
                Vérifiez votre connexion internet ou réessayez plus tard.
              </p>

              <m.button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Réessayer
              </m.button>
            </div>
          </m.div>
        ) : liveData?.isLive ? (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="bg-green-900/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-red-400" />
              </div>

              <h3 className="text-2xl font-semibold text-white mb-2">En direct maintenant</h3>
              <p className="text-gray-300 mb-6">Un live est en cours sur la chaîne — rejoignez-le maintenant !</p>

              <a
                href={String(liveData.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                <Play className="w-4 h-4" /> Voir le live
              </a>
            </div>
          </m.div>
        ) : latestVideo ? (
          <m.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Video Thumbnail */}
              <m.div whileHover={{ scale: 1.02 }} className="relative group">
                {/* Rendre la miniature cliquable */}
                <a
                  href={`https://www.youtube.com/watch?v=${latestVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                  tabIndex={0}
                  aria-label={`Regarder ${latestVideo.title} sur YouTube`}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src={latestVideo.thumbnail}
                      alt={latestVideo.title}
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <m.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Play
                          className="w-8 h-8 text-white ml-1"
                          fill="currentColor"
                        />
                      </m.div>
                    </div>

                    {/* Duration badge */}
                    {latestVideo.duration && (
                      <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                        {formatDuration(latestVideo.duration)}
                      </div>
                    )}
                  </div>
                </a>
              </m.div>

              {/* Video Info */}
              <m.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {latestVideo.title}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed line-clamp-4">
                  {latestVideo.description}
                </p>

                {/* Video Stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">
                      {formatDate(latestVideo.publishedAt)}
                    </span>
                  </div>

                  {latestVideo.viewCount && (
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                      <Eye className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">
                        {formatViewCount(latestVideo.viewCount)}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <m.a
                  href={`https://www.youtube.com/watch?v=${latestVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/25 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Regarder maintenant
                  <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
                </m.a>
              </m.div>
            </div>
          </m.div>
        ) : (
          <m.div className="text-center py-20 text-gray-400">
            <p>Aucune vidéo trouvée pour le moment.</p>
            <m.button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Réessayer
            </m.button>
          </m.div>
        )}
      </div>
    </section>
  );
};

export default LastVideosSection;
