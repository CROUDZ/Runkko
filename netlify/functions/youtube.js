// Cache simple en mémoire (sera réinitialisé à chaque déploiement)
let cache = {
  data: null,
  timestamp: 0,
  duration: 5 * 60 * 1000, // 5 minutes
  errorTimestamp: 0,
  quotaExceeded: false,
};

exports.handler = async function () {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  console.log("start youtube function");

  // Si quota dépassé récemment, retourner données par défaut pendant 24h
  const now = Date.now();
  if (cache.quotaExceeded && now - cache.errorTimestamp < 24 * 60 * 60 * 1000) {
    console.log("Quota exceeded recently, returning default data");
    const fallbackData = {
      videoData: null,
      liveData: { isLive: false, url: false },
    };
    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
      body: JSON.stringify(fallbackData),
    };
  }

  // Vérifier le cache d'abord
  if (cache.data && now - cache.timestamp < cache.duration) {
    console.log("Returning cached data");
    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "public, max-age=300",
      },
      body: JSON.stringify(cache.data),
    };
  }

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key manquante" }),
    };
  }
  if (!channelId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Paramètre channelId manquant" }),
    };
  }

  try {
    // Requêtes pour récupérer la dernière vidéo et vérifier s'il y a un live en cours.
    const latestVideoUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=1&type=video`;
    const liveCheckUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&eventType=live&type=video&maxResults=1`;

    console.log("Fetching latestVideoUrl:", latestVideoUrl);
    console.log("Fetching liveCheckUrl:", liveCheckUrl);

    const [searchRes, liveRes] = await Promise.all([
      fetch(latestVideoUrl),
      fetch(liveCheckUrl),
    ]);

    // Gérer spécifiquement l'erreur de quota dépassé
    if (!searchRes.ok) {
      const errorBody = await searchRes.text();
      console.error(
        "Erreur lors de la récupération des vidéos (latest):",
        searchRes.status,
        errorBody,
      );

      // Gérer spécifiquement l'erreur de quota dépassé
      if (searchRes.status === 403) {
        console.error("QUOTA EXCEEDED - Setting 24h cache");
        const fallbackData = {
          videoData: null,
          liveData: { isLive: false, url: false },
        };

        // Marquer le quota comme dépassé pour 24h
        cache.quotaExceeded = true;
        cache.errorTimestamp = now;
        cache.data = fallbackData;
        cache.timestamp = now;

        return {
          statusCode: 200,
          headers: {
            "Cache-Control": "public, max-age=86400", // Cache 24 heures
          },
          body: JSON.stringify(fallbackData),
        };
      }

      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Erreur lors de la récupération des vidéos (latest)",
          status: searchRes.status,
          body: errorBody,
        }),
      };
    }

    if (!liveRes.ok) {
      const errorBody = await liveRes.text();
      console.error(
        "Erreur lors de la vérification du live:",
        liveRes.status,
        errorBody,
      );

      // Si quota dépassé pour le live, continuer avec juste les données de vidéo
      if (liveRes.status === 403) {
        console.log("Quota dépassé pour le live check, on continue sans");
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: "Erreur lors de la vérification du live",
            status: liveRes.status,
            body: errorBody,
          }),
        };
      }
    }

    const searchData = await searchRes.json();
    let liveDataRaw = null;

    // Essayer de récupérer les données live seulement si la requête a réussi
    if (liveRes.ok) {
      liveDataRaw = await liveRes.json();
    }

    // --- Préparer liveData ---
    let liveData = { isLive: false, url: false };
    if (liveDataRaw && liveDataRaw.items && liveDataRaw.items.length > 0) {
      const liveVideo = liveDataRaw.items[0];
      const liveVideoId = liveVideo.id?.videoId;
      if (liveVideoId) {
        liveData = {
          isLive: true,
          url: `https://www.youtube.com/watch?v=${liveVideoId}`,
        };
      }
    }

    // --- Si aucune vidéo trouvée, on renvoie une erreur comme avant (mais on pourrait renvoyer quand même liveData si tu veux) ---
    if (!searchData.items || searchData.items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Aucune vidéo trouvée",
          liveData,
        }),
      };
    }

    const video = searchData.items[0];
    const videoId = video.id.videoId;

    // Récupérer les statistiques et contentDetails de la vidéo
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics,contentDetails`,
    );
    if (!statsRes.ok) {
      // On ne plante pas complètement : on renvoie la vidéo sans stats si l'API stats échoue
      console.warn(
        "Impossible de récupérer les stats de la vidéo :",
        await statsRes.text(),
      );
    }
    const statsData = await statsRes.json();
    const stats = statsData.items?.[0];

    // Récupérer le nombre de likes de la vidéo (si disponible)
    const likeCount = stats?.statistics?.likeCount ?? null;

    // Récupérer le nombre d'abonnés de la chaîne
    let subscriberCount = null;
    try {
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${channelId}&part=statistics`,
      );
      if (channelRes.ok) {
        const channelData = await channelRes.json();
        const channelStats = channelData.items?.[0]?.statistics;
        subscriberCount = channelStats?.subscriberCount ?? null;
      } else {
        const chErr = await channelRes.text();
        console.warn(
          "Impossible de récupérer les stats de la chaîne :",
          channelRes.status,
          chErr,
        );
        // si quota dépassé on ne marque pas tout le service comme en erreur ici,
        // on se contente de renvoyer null pour subscriberCount
      }
    } catch (e) {
      console.warn("Erreur lors de la récupération des abonnés :", e.message);
    }

    const videoData = {
      id: videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail:
        video.snippet.thumbnails?.maxres?.url ||
        video.snippet.thumbnails?.high?.url ||
        video.snippet.thumbnails?.default?.url ||
        null,
      publishedAt: video.snippet.publishedAt,
      viewCount: stats?.statistics?.viewCount ?? null,
      duration: stats?.contentDetails?.duration ?? null,
      likeCount: likeCount,
    };

    // Objet final contenant videoData, liveData et les infos chaîne
    const responsePayload = {
      videoData,
      liveData,
      channelData: {
        subscriberCount,
      },
    };

    // Mettre en cache la réponse et reset quota exceeded
    cache.data = responsePayload;
    cache.timestamp = now;
    cache.quotaExceeded = false; // Reset quota exceeded flag on success

    console.log(responsePayload);

    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "public, max-age=300", // Cache côté client de 5 minutes
      },
      body: JSON.stringify(responsePayload),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erreur lors du chargement de la vidéo / vérification du live",
        details: err.message,
      }),
    };
  }
};
