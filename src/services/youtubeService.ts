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

interface ChannelData {
  subscriberCount: number;
}

export interface YouTubeData {
  videoData: VideoData | null;
  liveData: LiveData | null;
  channelData: ChannelData | null;
  lastFetched: number;
}

class YouTubeService {
  private cache: YouTubeData | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes
  private fetchPromise: Promise<YouTubeData> | null = null;

  private getApiUrl(): string {
    return process.env.NODE_ENV === "development"
      ? "http://localhost:8888/.netlify/functions/youtube"
      : "/.netlify/functions/youtube";
  }

  private async fetchFromAPI(): Promise<YouTubeData> {
    try {
      const apiUrl = this.getApiUrl();
      const urlWithCacheBuster = `${apiUrl}?t=${Date.now()}`;

      console.log("Fetching YouTube data from API:", urlWithCacheBuster);
      const response = await fetch(urlWithCacheBuster);

      if (!response.ok) {
        const errData = await response
          .json()
          .catch(() => ({ error: "Erreur réseau" }));
        throw new Error(
          errData.error || "Erreur lors de la récupération des données YouTube",
        );
      }

      const data = await response.json();
      console.log("YouTube API response:", data);

      const result: YouTubeData = {
        videoData: data.videoData ?? null,
        liveData: data.liveData ?? null,
        channelData: data.channelData ?? null,
        lastFetched: Date.now(),
      };

      // Mettre en cache les données
      this.cache = result;
      console.log("YouTube data cached successfully");

      return result;
    } catch (error) {
      console.error("YouTube API error:", error);
      throw error;
    }
  }

  public async getData(forceRefresh = false): Promise<YouTubeData> {
    // Si on a une requête en cours, l'attendre
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    // Vérifier le cache si on ne force pas le refresh
    if (!forceRefresh && this.cache) {
      const cacheAge = Date.now() - this.cache.lastFetched;
      if (cacheAge < this.CACHE_DURATION) {
        console.log(
          "Using cached YouTube data, age:",
          Math.round(cacheAge / 1000),
          "seconds",
        );
        return this.cache;
      }
    }

    // Créer une nouvelle promesse de fetch
    this.fetchPromise = this.fetchFromAPI();

    try {
      const result = await this.fetchPromise;
      return result;
    } catch (error) {
      // En cas d'erreur, retourner le cache si disponible
      if (this.cache) {
        console.warn("API failed, using cached data");
        return this.cache;
      }
      throw error;
    } finally {
      // Réinitialiser la promesse
      this.fetchPromise = null;
    }
  }

  public getCachedData(): YouTubeData | null {
    return this.cache;
  }

  public clearCache(): void {
    this.cache = null;
  }
}

// Instance singleton
export const youtubeService = new YouTubeService();
