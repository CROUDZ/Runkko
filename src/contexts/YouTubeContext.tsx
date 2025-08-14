"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { YouTubeData, youtubeService } from "@/services/youtubeService";

interface YouTubeContextType {
  data: YouTubeData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const YouTubeContext = createContext<YouTubeContextType | undefined>(undefined);

export const useYouTube = (): YouTubeContextType => {
  const context = useContext(YouTubeContext);
  if (!context) {
    throw new Error("useYouTube must be used within a YouTubeProvider");
  }
  return context;
};

interface YouTubeProviderProps {
  children: ReactNode;
}

export const YouTubeProvider: React.FC<YouTubeProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const result = await youtubeService.getData(forceRefresh);
      setData(result);

      // Vérifier si on a des données valides
      if (
        !result.videoData &&
        (!result.liveData || !result.liveData.isLive) &&
        !result.channelData
      ) {
        setError("Aucune donnée YouTube disponible pour le moment.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des données YouTube";
      setError(errorMessage);
      console.error("YouTube data fetch error:", err);

      // Essayer d'utiliser les données en cache en cas d'erreur
      const cachedData = youtubeService.getCachedData();
      if (cachedData) {
        setData(cachedData);
        setError("Données en cache utilisées (erreur réseau)");
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchData(true);
  };

  useEffect(() => {
    // Charger les données au montage
    fetchData();

    // Actualiser toutes les 5 minutes
    const interval = setInterval(
      () => {
        fetchData();
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const contextValue: YouTubeContextType = {
    data,
    loading,
    error,
    refetch,
  };

  return (
    <YouTubeContext.Provider value={contextValue}>
      {children}
    </YouTubeContext.Provider>
  );
};
