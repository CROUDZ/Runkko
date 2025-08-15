interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  publishedAt: string;
  viewCount?: string | null;
  duration?: string | null;
  likeCount?: string | null;
}

interface LiveData {
  isLive: boolean;
  url: string | false;
}

interface ChannelData {
  subscriberCount: number | null;
}

export interface YouTubeData {
  videoData: VideoData | null;
  liveData: LiveData | null;
  channelData: ChannelData | null;
  lastFetched: number;
}

class YouTubeService {
  private cache: YouTubeData | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private fetchPromise: Promise<YouTubeData> | null = null;
  private lastErrorTimestamp: number | null = null;
  private readonly ERROR_COOLDOWN = this.CACHE_DURATION; // cooldown après erreur

  private getApiUrl(): string {
    return process.env.NODE_ENV === "development"
      ? "http://localhost:8888/.netlify/functions/youtube"
      : "/.netlify/functions/youtube";
  }

  private createFallback(): YouTubeData {
    return {
      videoData: null,
      liveData: { isLive: false, url: false },
      channelData: null,
      lastFetched: Date.now(),
    };
  }

  private async fetchFromAPI(): Promise<YouTubeData> {
    try {
      const apiUrl = this.getApiUrl();
      const urlWithCacheBuster = `${apiUrl}?t=${Date.now()}`;
      console.log("Fetching YouTube data from API:", urlWithCacheBuster);
      const response = await fetch(urlWithCacheBuster);

      if (!response.ok) {
        // try parse body for debug
        const errBody = await response
          .json()
          .catch(() => ({ error: "Erreur réseau" }));
        throw new Error(errBody.error || `HTTP ${response.status}`);
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
      this.lastErrorTimestamp = null;
      console.log("YouTube data cached successfully");

      return result;
    } catch (error) {
      console.error("YouTube API error:", error);
      // Negative cache : empêcher de retenter immédiatement si l'API répond mal
      const fallback = this.createFallback();
      this.cache = fallback;
      this.lastErrorTimestamp = Date.now();

      // Rethrow pour que l'appelant sache qu'il y a eu une erreur,
      // mais la cache contient une réponse fallback utilisable.
      throw error;
    }
  }

  public async getData(forceRefresh = false): Promise<YouTubeData> {
    // Si fetch en cours, attendre
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    const now = Date.now();

    // Si cache valide et non forcé, retourner cache
    if (!forceRefresh && this.cache) {
      const age = now - this.cache.lastFetched;
      if (age < this.CACHE_DURATION) {
        console.log(
          "Using cached YouTube data, age:",
          Math.round(age / 1000),
          "s",
        );
        return this.cache;
      }
    }

    // Si pas de cache, mais erreur récente, renvoyer fallback sans re-fetch
    if (!forceRefresh && !this.cache && this.lastErrorTimestamp) {
      if (now - this.lastErrorTimestamp < this.ERROR_COOLDOWN) {
        console.warn(
          "Recent error - returning fallback cached data to avoid retry storm",
        );
        // On crée un fallback si nécessaire
        const fallback = this.createFallback();
        this.cache = fallback;
        return fallback;
      }
    }

    // Lancer fetch (protégé par fetchPromise)
    this.fetchPromise = this.fetchFromAPI();

    try {
      const result = await this.fetchPromise;
      return result;
    } catch (error) {
      // En cas d'erreur, retourner le cache fallback si disponible
      if (this.cache) {
        console.warn("API failed, returning cached/fallback data");
        return this.cache;
      }
      throw error;
    } finally {
      this.fetchPromise = null;
    }
  }

  public getCachedData(): YouTubeData | null {
    return this.cache;
  }

  public clearCache(): void {
    this.cache = null;
    this.lastErrorTimestamp = null;
  }
}

export const youtubeService = new YouTubeService();
