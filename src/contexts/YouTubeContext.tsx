"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
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
  // si tu veux réactiver le polling, tu peux exposer un prop pollIntervalMs?: number
}

export const YouTubeProvider: React.FC<YouTubeProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // empêche double fetch en dev (React Strict Mode) ou double mount
  const didFetchRef = useRef(false);

  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const result = await youtubeService.getData(forceRefresh);
      setData(result);

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

      // essayer d'utiliser les données en cache si disponibles
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
    // éviter double fetch en dev / double mount
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    fetchData();

    // NOTE : j'ai enlevé le setInterval pour respecter "une requête par chargement de page".
    // Si tu veux un refresh automatique, tu peux rajouter ici un interval configurable.
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
